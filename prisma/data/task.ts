export const dataTask = [
  {
    title: 'Xây dựng JWT Authentication',
    description: 'Bao gồm có Login, Register, Forgot Password',
    dueDate: new Date('2023-11-20'),
    assignee: {
      connect: { email: 'tvhoang@cit.ctu.edu.vn' },
    },
    plan: {
      connect: { slug: 'xay-dung-he-thong-quan-ly-nhan-su' },
    },
    priority: 1,
    todos: {
      create: [{ content: 'Tạo API Login' }, { content: 'Tạo API Register' }],
    },
    position: 65536,
  },
  {
    title: 'Xây dựng quản lý nhân sự',
    description: 'Bao gồm có thêm, sửa, xóa nhân sự',
    dueDate: new Date('2023-11-22'),
    assignee: {
      connect: { email: 'tvhoang@cit.ctu.edu.vn' },
    },
    plan: {
      connect: { slug: 'xay-dung-he-thong-quan-ly-nhan-su' },
    },
    priority: 1,
    todos: {
      create: [
        { content: 'Tạo API thêm nhân sự' },
        { content: 'Tạo API sửa nhân sự' },
      ],
    },
    position: 131072,
  },
];
