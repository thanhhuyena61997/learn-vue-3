// import Antd from 'ant-design-vue/lib'
import {
  Avatar,
  Breadcrumb,
  Button,
  Checkbox,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  Pagination,
  Popover,
  Radio,
  Select,
  Spin,
  Table,
  TimePicker,
  Tooltip
} from 'ant-design-vue';
import { App } from 'vue';

export function registerAntDesignComponents(app: App<Element>): void {
  app.use(ConfigProvider);
  app.use(Button);
  app.use(DatePicker);
  app.use(Select);
  app.use(Breadcrumb);
  app.use(Layout);
  app.use(Menu);
  app.use(Avatar);
  app.use(Popover);
  app.use(Form);
  app.use(Input);
  app.use(Checkbox);
  app.use(Modal);
  app.use(Table);
  app.use(TimePicker);
  app.use(Pagination);
  app.use(Radio);
  app.use(Spin);
  app.use(Tooltip);
}
