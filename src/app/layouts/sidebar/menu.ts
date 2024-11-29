import { MenuItem } from './menu.model';
export const MENU_ADMIN: MenuItem[] = [
  {
    id: 1,
    label: 'Cấu hình ',
    icon: 'bx-home-circle',
    subItems: [
     {
        id: 6,
        label: 'Quản lý người dùng',
        link: '/pages/category/users',
        parentId: 1
      }
    ]
  }
];
export const MENU_BID: MenuItem[] = [
  {
    id: 1,
    label: 'Cấu hình ',
    icon: 'bx-home-circle',
    subItems: [
      {
        id: 6,
        label: 'Báo cáo thống kê',
        link: '/pages/category/report',
        parentId: 1
      },
      {
        id: 6,
        label: 'Quản lý người dùng',
        link: '/pages/category/users',
        parentId: 1
      },
      {
        id: 6,
        label: 'Quản hồ sơ',
        link: '/pages/category/profile',
        parentId: 1
      },
      {
        id: 6,
        label: 'Quản lý điều động/ thuyên chuyển',
        link: '/pages/category/tranfers',
        parentId: 1
      },
      {
        id: 6,
        label: 'Quản lý nghỉ hưu/thôi việc',
        link: '/pages/category/leave',
        parentId: 1
      }
    ]
  }
];


