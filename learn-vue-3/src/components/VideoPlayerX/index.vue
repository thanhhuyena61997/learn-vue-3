<template>
  <section id="sdg-video-player">
    <div
      ref="videoContainer"
      class="video-container"
      :class="{
        paused: !isPlay,
        'full-screen': isFullScreen,
        captions: captionsMode,
        scrubbing: isScrubbing
      }"
      data-volume-level="high"
    >
      <button v-if="!isPlay" class="button-play" @click="onPlay">
        <s-base-icon name="play-button" class="play-button__icon" />
      </button>
      <div class="video-controls-container">
        <div
          v-if="options.control"
          ref="timelineContainer"
          class="timeline-container"
          @mousemove="handleTimelineUpdate"
          @mousedown="toggleScrubbing"
        >
          <div class="timeline">
            <img class="preview-img" />
            <div class="thumb-indicator"></div>
          </div>
        </div>
        <div class="controls">
          <button v-if="options.control" class="play-pause-btn" @click="onPlay">
            <svg class="play-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
            <svg class="pause-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
            </svg>
          </button>
          <div class="controls__volume">
            <button ref="muteBtn" @click="toggleMute">
              <s-base-icon name="volume-high" class="volume-high-icon" />
              <s-base-icon name="volume-low" class="volume-low-icon" />
              <s-base-icon name="volume-muted" class="volume-muted-icon" />
            </button>
            <input
              ref="volumeSlider"
              class="volume-slider styled-slider slider-progress"
              type="range"
              :min="0"
              :max="1"
              step="any"
              :value="1"
              :style="volumeConfigStyle"
              @input="sliderVolumeChange"
            />
          </div>
          <div class="duration-container">
            <div ref="currentTimeElem" class="current-time">0:00</div>
            /
            <div ref="totalTimeElem" class="total-time"></div>
          </div>
          <button class="captions-btn" @click="toggleCaptions">
            <s-base-icon name="subtitles" class="icon-subtitles" />
          </button>
          <button ref="fullScreenBtn" class="full-screen-btn" @click="toggleFullScreenMode">
            <svg class="open" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
              />
            </svg>
            <svg class="close" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
              />
            </svg>
          </button>
        </div>
      </div>
      <video
        ref="video"
        preload="metadata"
        muted
        disablePictureInPicture
        :src="options.src"
        @click="onPlay"
        @loadeddata="loadedDataVideo"
        @timeupdate="timeUpdateVideo"
        @volumechange="volumeChange"
        @ended="finishVideo"
      >
        <track kind="captions" srclang="en" src="../../../src/assets/temp/demo.vtt" />
      </video>
    </div>
  </section>
</template>

<script lang="ts">
import StorageService from '../../services/local-storage';
import { defineComponent, onMounted, ref } from 'vue';
import SBaseIcon from '@/components/BaseIcon/index.vue';

export interface VideoPlayerProps {
  videoId: string;
  src: string;
  title: string;
  cover: string;
  preventPause: boolean;
  captions?: string;
  control: boolean;
  onVideoPlay?: () => void;
  onVideoPause?: () => void;
  onVideoEnded?: () => void;
}

export default defineComponent({
  name: 'SVideoPlayerX',

  props: {
    options: {
      type: Object as () => VideoPlayerProps,
      required: true
    }
  },

  setup(props) {
    console.log(props);

    const video = ref<HTMLVideoElement>();
    const videoContainer = ref<HTMLElement>();
    const fullScreenBtn = ref<HTMLElement>();
    const timelineContainer = ref<HTMLElement>();
    const totalTimeElem = ref<HTMLElement>();
    const currentTimeElem = ref<HTMLElement>();
    const muteBtn = ref<HTMLElement>();
    const volumeSlider = ref<Element & { value: number }>();

    const isPlay = ref<boolean>(false);
    const isFullScreen = ref<boolean>(false);
    const captionsMode = ref<boolean>(false);
    const isScrubbing = ref<boolean>(false);
    const wasPaused = ref<boolean>(false);
    const volumeConfigStyle = ref<string>('--value: 1; --min: 0; --max: 1');

    const videoId = ref<string>(props.options.videoId);
    let videoPlayed = false;
    let finishWatching = false;
    const dataStorage = StorageService.get(videoId.value) || {};
    const timePrevious = ref<number>(0);

    const continuePlayVideo = () => {
      if (!props.options.control) {
        videoPlayed = dataStorage?.videoPlayed || false;
        timePrevious.value = dataStorage?.currentTimeVideo || 0;
        finishWatching = dataStorage?.finishWatching || false;
        if (finishWatching && video.value) {
          // đã xem xong video
          props.options.onVideoEnded && props.options.onVideoEnded();
          isPlay.value = true;
        } else if (videoPlayed && videoContainer.value && volumeSlider.value && video.value) {
          // đang xem giữa chừng, tua tới đoạn xem trước đó
          videoContainer.value.dataset.volumeLevel = 'muted';
          volumeConfigStyle.value = "--value: '0'; --min: 0; --max: 1";
          volumeSlider.value.value = 0;
          video.value.currentTime = timePrevious.value;
          video.value.play();
          isPlay.value = true;
        }
      }
    };

    const handleTimelineUpdate = (e: any) => {
      if (timelineContainer.value) {
        const rect = timelineContainer.value.getBoundingClientRect();
        const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
        timelineContainer.value.style.setProperty('--preview-position', percent.toString());

        if (isScrubbing.value) {
          e.preventDefault();
          timelineContainer.value.style.setProperty('--progress-position', percent.toString());
        }
      }
    };

    const toggleScrubbing = (e: any) => {
      if (timelineContainer.value && video.value) {
        const rect = timelineContainer.value.getBoundingClientRect();
        const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
        isScrubbing.value = (e.buttons & 1) === 1;

        if (isScrubbing.value) {
          wasPaused.value = video.value.paused;
          video.value.pause();
        } else {
          const currentTime = percent * video.value.duration;
          video.value.currentTime = currentTime;
          if (!wasPaused.value) video.value.play();
        }
        handleTimelineUpdate(e);
      }
    };

    onMounted(() => {
      continuePlayVideo();
      document.addEventListener('mouseup', e => {
        if (isScrubbing.value) {
          toggleScrubbing(e);
        }
      });
      document.addEventListener('mousemove', e => {
        if (isScrubbing.value) {
          handleTimelineUpdate(e);
        }
      });
    });

    const loadCurrentTime = () => {
      if (video.value) {
        video.value.currentTime = timePrevious.value;
      }
    };

    const onPlay = () => {
      if (video.value && !videoPlayed) {
        isPlay.value = video.value.paused;
        if (isPlay.value) {
          video.value.muted = false;
          video.value.play();

          if (!props.options.control) {
            // lưu trang thái đang xem cho video
            dataStorage.videoPlayed = true;
            videoPlayed = true;
            StorageService.set(videoId.value, dataStorage);
          }
        } else {
          video.value.pause();
        }
      }
    };

    const toggleFullScreenMode = () => {
      if (document.fullscreenElement == null) {
        videoContainer.value?.requestFullscreen();
        isFullScreen.value = true;
      } else {
        document.exitFullscreen();
        isFullScreen.value = false;
      }
    };

    const toggleCaptions = () => {
      if (video.value) {
        const captions = video.value.textTracks[0];
        captionsMode.value = captions.mode === 'hidden' || captions.mode === 'disabled';
        captions.mode = captionsMode.value ? 'showing' : 'hidden';
      }
    };

    const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
      minimumIntegerDigits: 2
    });

    const formatDuration = (time: number) => {
      const seconds = Math.floor(time % 60);
      const minutes = Math.floor(time / 60) % 60;
      const hours = Math.floor(time / 3600);
      if (hours === 0) {
        return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
      } else {
        return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(
          seconds
        )}`;
      }
    };

    const loadedDataVideo = () => {
      if (totalTimeElem.value && video.value)
        totalTimeElem.value.textContent = formatDuration(video.value.duration);
      if (finishWatching && video.value) {
        // load tới cuối video nếu đã xem hết video
        video.value.currentTime = video.value.duration;
      }
    };

    let beforeCurrentTimeVideo = 0;
    const timeUpdateVideo = () => {
      if (currentTimeElem.value && video.value) {
        currentTimeElem.value.textContent = formatDuration(video.value.currentTime);
        const percent = video.value.currentTime / video.value.duration;
        if (timelineContainer.value) {
          timelineContainer.value.style.setProperty('--progress-position', percent.toString());
        }

        if (!props.options.control && video.value.currentTime - beforeCurrentTimeVideo > 2) {
          dataStorage.currentTimeVideo = video.value.currentTime;
          StorageService.set(videoId.value, dataStorage);
          beforeCurrentTimeVideo = video.value.currentTime;
        }
      }
    };

    const toggleMute = () => {
      if (video.value) {
        video.value.muted = !video.value.muted;
        volumeConfigStyle.value = `--value: ${
          video.value.muted ? '0' : video.value.volume
        }; --min: 0; --max: 1`;
      }
    };

    const volumeChange = () => {
      if (volumeSlider.value && video.value) volumeSlider.value.value = video.value.volume;

      let volumeLevel;
      if (video.value?.muted || video.value?.volume === 0) {
        if (volumeSlider.value) volumeSlider.value.value = 0;
        volumeLevel = 'muted';
      } else if ((video.value?.volume as number) >= 0.5) {
        volumeLevel = 'high';
      } else {
        volumeLevel = 'low';
      }

      if (videoContainer.value) videoContainer.value.dataset.volumeLevel = volumeLevel;
    };

    const sliderVolumeChange = (e: Event) => {
      if (video.value) {
        video.value.volume = parseFloat((e.target as HTMLInputElement).value);
        video.value.muted = parseFloat((e.target as HTMLInputElement).value) === 0;
        volumeConfigStyle.value = `--value: ${video.value.volume}; --min: 0; --max: 1`;
      }
    };

    const finishVideo = () => {
      props.options.onVideoEnded && props.options.onVideoEnded();
      dataStorage.finishWatching = true;
      StorageService.set(videoId.value, dataStorage);
    };

    return {
      onPlay,
      video,
      toggleFullScreenMode,
      toggleCaptions,
      handleTimelineUpdate,
      toggleScrubbing,
      loadedDataVideo,
      timeUpdateVideo,
      toggleMute,
      volumeChange,
      sliderVolumeChange,
      loadCurrentTime,
      finishVideo,

      videoContainer,
      fullScreenBtn,
      timelineContainer,
      totalTimeElem,
      currentTimeElem,
      muteBtn,
      volumeSlider,

      isPlay,
      isFullScreen,
      captionsMode,
      isScrubbing,
      volumeConfigStyle
    };
  }
});
</script>

<style lang="scss">
@import './VideoPlayerX.scss';
</style>
