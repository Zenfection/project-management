export const dataPlans = [
  {
    title: 'Xây Dựng Hệ Thống Quản Lý Nhân Sự',
    slug: 'xay-dung-he-thong-quan-ly-nhan-su',
    description:
      'Phát triển phần mềm quản lý nhân sự cho phép lưu trữ thông tin nhân viên, theo dõi quá trình tuyển dụng, đánh giá năng lực nhân viên, lập kế hoạch đào tạo và phát triển.',
    owner: {
      connect: { email: 'tmthai@cit.ctu.edu.vn' },
    },
    members: {
      connect: [
        { email: 'tvhoang@cit.ctu.edu.vn' },
        { email: 'hxhiep@cit.ctu.edu.vn' },
        { email: 'ncdanh@cit.ctu.edu.vn' },
      ],
    },
    category: { connect: { slug: 'phan-mem' } },
  },
  {
    title: 'Xây dựng kế hoạch đào tạo sinh viên',
    slug: 'xay-dung-ke-hoach-dao-tao-sinh-vien',
    description:
      'Phân tích nhu cầu đào tạo của nhân viên và xây dựng kế hoạch đào tạo hàng năm, bao gồm các khóa đào tạo nội bộ, đào tạo bên ngoài.',
    owner: {
      connect: { email: 'tvhoang@cit.ctu.edu.vn' },
    },
    members: {
      connect: [
        { email: 'hqnghi@cit.ctu.edu.vn' },
        { email: 'pplan@cit.ctu.edu.vn' },
        { email: 'cxphuong@cit.ctu.edu.vn' },
        { email: 'hqthai@cit.ctu.edu.vn' },
      ],
    },
    category: { connect: { slug: 'dao-tao' } },
  },
  {
    title: 'Triển khai hệ thống đánh giá năng lực nhân viên',
    slug: 'trien-khai-he-thong-danh-gia-nang-luc-nhan-vien',
    description:
      'Xây dựng và áp dụng hệ thống đánh giá năng lực định kỳ cho nhân viên dựa trên kết quả công việc, mức độ hoàn thành nhiệm vụ.',
    owner: {
      connect: { email: 'tvhoang@cit.ctu.edu.vn' },
    },
    members: {
      connect: [
        { email: 'lhbao@cit.ctu.edu.vn' },
        { email: 'tmthai@cit.ctu.edu.vn' },
        { email: 'ttttuyen@cit.ctu.edu.vn' },
        { email: 'txviet@cit.ctu.edu.vn' },
        { email: 'chgiang@cit.ctu.edu.vn' },
      ],
    },
    category: { connect: { slug: 'phan-mem' } },
  },
];
