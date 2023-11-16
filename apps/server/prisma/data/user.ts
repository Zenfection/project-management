import { $Enums } from '@prisma/client';

export const dataUser = [
  {
    email: 'tmthai@cit.ctu.edu.vn',
    password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
    info: {
      create: {
        name: 'TS. Trương Minh Thái',
        about:
          'Cấu trúc dữ liệu, Quản lý dự án phần mềm - Nguyên lý xây dựng phần mềm - Nền tảng phần mềm nhúng và IoT',
        avatar: 'avatar/TMTHAI.jpg',
        address: 'Đường 3/2 Khu II Đại học Cần Thơ',
        email: 'tmthai@cit.ctu.edu.vn',
      },
    },
    setting: {
      create: {},
    },
    roles: {
      connect: [{ name: 'TRUONG_KHOA' }, { name: 'GIANG_VIEN_CHINH' }],
    },
    department: 'CONG_NGHE_PHAN_MEM' as $Enums.Deparment,
  },
  {
    email: 'vhtram@cit.ctu.edu.vn',
    password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
    info: {
      create: {
        name: 'ThS. Võ Huỳnh Trâm',
        about:
          'Lập trình căn bản, Cấu trúc dữ liệu - Phân tích và thiết kế thuật toán - Phân tích yêu cầu phần mềm, Quản lý dự án phần mềm',
        avatar: 'avatar/VHTram.jpg',
        address: 'Đường 3/2 Khu II Đại học Cần Thơ',
        email: 'vhtram@cit.ctu.edu.vn',
      },
    },
    setting: {
      create: {},
    },
    roles: {
      connect: [{ name: 'BI_THU_CHI_BO' }, { name: 'PHO_TRUONG_KHOA' }],
    },
    department: 'CONG_NGHE_PHAN_MEM' as $Enums.Deparment,
  },
  {
    email: 'hxhiep@cit.ctu.edu.vn',
    password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
    info: {
      create: {
        name: 'PGs. TS. Huỳnh Xuân Hiệp',
        about:
          'Nhập môn công nghệ phần mềm, Quản lý dự án phần mềm - Phân tích yêu cầu phần mềm, Kiến trúc và thiết kế phần mềm - Phát triển phần mềm nhúng',
        avatar: 'avatar/HXHiep.jpg',
        address: 'Đường 3/2 Khu II Đại học Cần Thơ',
        email: 'hxhiep@cit.ctu.edu.vn',
      },
    },
    setting: {
      create: {},
    },
    roles: {
      connect: [{ name: 'GIANG_VIEN_CAO_CAP' }, { name: 'PHO_HIEU_TRUONG' }],
    },
    department: 'CONG_NGHE_PHAN_MEM' as $Enums.Deparment,
  },
  {
    email: 'ttttuyen@cit.ctu.edu.vn',
    password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
    info: {
      create: {
        name: 'ThS. Trương Thị Thanh Tuyền',
        about:
          'Lập trình căn bản, Cấu trúc dữ liệu - Hệ thống Multi-Agent, Nguyên lý lập trình mô phỏng',
        avatar: 'avatar/TTTTuyen.jpg',
        address: 'Đường 3/2 Khu II Đại học Cần Thơ',
        email: 'ttttuyen@cit.ctu.edu.vn',
      },
    },
    setting: {
      create: {},
    },
    roles: {
      connect: [{ name: 'GIANG_VIEN_CHINH' }, { name: 'PHO_CHU_TICH_BCHCĐ' }],
    },
    department: 'CONG_NGHE_PHAN_MEM' as $Enums.Deparment,
  },
  {
    email: 'pplan@cit.ctu.edu.vn',
    password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
    info: {
      create: {
        name: 'TS. Phan Phương Lan',
        about:
          'Lập trình căn bản, Cấu trúc dữ liệu - Nhập môn công nghệ phần mềm, Quản lý dự án phần mềm - Bảo trì phần mềm',
        avatar: 'avatar/PPLan.jpg',
        address: 'Đường 3/2 Khu II Đại học Cần Thơ',
        email: 'pplan@cit.ctu.edu.vn',
      },
    },
    setting: {
      create: {},
    },
    roles: {
      connect: [{ name: 'GIANG_VIEN_CHINH' }, { name: 'CHU_TICH_CĐ_KHOA' }],
    },
    department: 'CONG_NGHE_PHAN_MEM' as $Enums.Deparment,
  },
  {
    email: 'ncdanh@cit.ctu.edu.vn',
    password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
    info: {
      create: {
        name: 'TS. Nguyễn Công Danh',
        about:
          'Lập trình căn bản, Cấu trúc dữ liệu - Phát triển phần mềm tác nghiệp, Phát triển ứng dụng Windows - Đảm bảo chất lượng và kiểm thử phần mềm',
        avatar: 'avatar/NCDanh.jpg',
        address: 'Đường 3/2 Khu II Đại học Cần Thơ',
        email: 'ncdanh@cit.ctu.edu.vn',
      },
    },
    setting: {
      create: {},
    },
    roles: {
      connect: [{ name: 'GIANG_VIEN' }, { name: 'PHO_CHU_TICH_CĐ' }],
    },
    department: 'CONG_NGHE_PHAN_MEM' as $Enums.Deparment,
  },
  {
    email: 'txviet@cit.ctu.edu.vn',
    password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
    info: {
      create: {
        name: 'TS. Trương Xuân Việt',
        about: 'Phân tích yêu cầu phần mềm - Nguyên lý xây dựng phần mềm',
        avatar: 'avatar/TXViet.jpg',
        address: 'Đường 3/2 Khu II Đại học Cần Thơ',
        email: 'txviet@cit.ctu.edu.vn',
      },
    },
    setting: {
      create: {},
    },
    roles: {
      connect: [{ name: 'GIANG_VIEN' }, { name: 'PHO_GIAM_DOC_TT_CNPM' }],
    },
    department: 'CONG_NGHE_PHAN_MEM' as $Enums.Deparment,
  },
  {
    email: 'cvloc@cit.ctu.edu.vn',
    password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
    info: {
      create: {
        name: 'TS. Cù Vĩnh Lộc',
        about:
          'Cấu trúc dữ liệu - Lập trình Java - Kiến trúc thiết kế phần mềm',
        avatar: 'avatar/CVLoc.jpg',
        address: 'Đường 3/2 Khu II Đại học Cần Thơ',
        email: 'cvloc@cit.ctu.edu.vn',
      },
    },
    setting: {
      create: {},
    },
    roles: {
      connect: [
        { name: 'GIANG_VIEN' },
        { name: 'TRUONG_BO_PHAN_DAO_TAO_TT_CNPM' },
      ],
    },
    department: 'CONG_NGHE_PHAN_MEM' as $Enums.Deparment,
  },
  {
    email: 'lhbao@cit.ctu.edu.vn',
    password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
    info: {
      create: {
        name: 'TS. Lâm Hoài Bảo',
        about:
          'Lập trình căn bản, Cấu trúc dữ liệu, Phân tích và thiết kế thuật toán - Lập trình .NET - Kiểm chứng mô hình, Tương tác người máy',
        avatar: 'avatar/LHBao.jpg',
        address: 'Đường 3/2 Khu II Đại học Cần Thơ',
        email: 'lhbao@cit.ctu.edu.vn',
      },
    },
    setting: {
      create: {},
    },
    roles: {
      connect: [{ name: 'GIANG_VIEN' }],
    },
    department: 'CONG_NGHE_PHAN_MEM' as $Enums.Deparment,
  },
  {
    email: 'phcuong@cit.ctu.edu.vn',
    password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
    info: {
      create: {
        name: 'Ths. Phan Huy Cường',
        about: '',
        avatar: 'avatar/PHCuong.jpg',
        address: 'Đường 3/2 Khu II Đại học Cần Thơ',
        email: 'phcuong@cit.ctu.edu.vn',
      },
    },
    setting: {
      create: {},
    },
    roles: {
      connect: [{ name: 'GIANG_VIEN' }, { name: 'PHO_GIAM_DOC_TT_ĐT-TH' }],
    },
    department: 'CONG_NGHE_PHAN_MEM' as $Enums.Deparment,
  },
  {
    email: 'otmlinh@cit.ctu.edu.vn',
    password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
    info: {
      create: {
        name: 'Ths. Ông Thị Mỹ Linh',
        about:
          'Cấu trúc dữ liệu - Lập trình .NET - Quản lý quy trình nghiệp vụ',
        avatar: 'avatar/OTMLinh.jpg',
        address: 'Đường 3/2 Khu II Đại học Cần Thơ',
        email: 'otmlinh@cit.ctu.edu.vn',
      },
    },
    setting: {
      create: {},
    },
    roles: {
      connect: [{ name: 'GIANG_VIEN' }],
    },
    department: 'CONG_NGHE_PHAN_MEM' as $Enums.Deparment,
  },
  {
    email: 'hqthai@cit.ctu.edu.vn',
    password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
    info: {
      create: {
        name: 'TS. Hồ Quang Thái',
        about:
          'Lập trình căn bản, Cấu trúc dữ liệu - Lập trình .NET, Lập trình Java',
        avatar: 'avatar/HQThai.jpg',
        address: 'Đường 3/2 Khu II Đại học Cần Thơ',
        email: 'hqthai@cit.ctu.edu.vn',
      },
    },
    setting: {
      create: {},
    },
    roles: {
      connect: [{ name: 'GIANG_VIEN' }],
    },
    department: 'CONG_NGHE_PHAN_MEM' as $Enums.Deparment,
  },
  {
    email: 'tvhoang@cit.ctu.edu.vn',
    password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
    info: {
      create: {
        name: 'TS. Trần Văn Hoàng',
        about:
          'Lập trình căn bản, Cấu trúc dữ liệu - Phân tích và thiết kế thuật toán - Phân tích yêu cầu phần mềm.',
        avatar: 'avatar/TVHoang.jpg',
        address: 'Đường 3/2 Khu II Đại học Cần Thơ',
        email: 'tvhoang@cit.ctu.edu.vn',
      },
    },
    setting: {
      create: {},
    },
    roles: {
      connect: [{ name: 'GIANG_VIEN' }],
    },
    department: 'CONG_NGHE_PHAN_MEM' as $Enums.Deparment,
  },
  {
    email: 'hqnghi@cit.ctu.edu.vn',
    password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
    info: {
      create: {
        name: 'TS. Huỳnh Quang Nghi',
        about:
          'Lập trình căn bản, Cấu trúc dữ liệu - Lập trình .NET, Lập trình Java - Bảo trì phần mềm, Nguyên lý lập trình mô phỏng',
        avatar: 'avatar/HQNghi.jpg',
        address: 'Đường 3/2 Khu II Đại học Cần Thơ',
        email: 'hqnghi@cit.ctu.edu.vn',
      },
    },
    setting: {
      create: {},
    },
    roles: {
      connect: [{ name: 'GIANG_VIEN' }, { name: 'THU_KY_KHOA' }],
    },
    department: 'CONG_NGHE_PHAN_MEM' as $Enums.Deparment,
  },
  {
    email: 'chgiang@cit.ctu.edu.vn',
    password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
    info: {
      create: {
        name: 'ThS. Cao Hoàng Giang',
        about:
          'Lập trình căn bản, Cấu trúc dữ liệu - Lập trình .NET, Lập trình Java',
        avatar: 'avatar/CHGiang.jpg',
        address: 'Đường 3/2 Khu II Đại học Cần Thơ',
        email: 'chgiang@cit.ctu.edu.vn',
      },
    },
    setting: {
      create: {},
    },
    roles: {
      connect: [{ name: 'GIANG_VIEN' }],
    },
    department: 'CONG_NGHE_PHAN_MEM' as $Enums.Deparment,
  },
  {
    email: 'cxphuong@cit.ctu.edu.vn',
    password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
    info: {
      create: {
        name: 'Ths. Châu Xuân Phương',
        about: 'Lập trình căn bản, Cấu trúc dữ liệu',
        avatar: 'avatar/CXPhuong.jpg',
        address: 'Đường 3/2 Khu II Đại học Cần Thơ',
        email: 'cxphuong@cit.ctu.edu.vn',
      },
    },
    setting: {
      create: {},
    },
    roles: {
      connect: [{ name: 'GIANG_VIEN' }],
    },
    department: 'CONG_NGHE_PHAN_MEM' as $Enums.Deparment,
  },
  {
    email: 'nvlinh@cit.ctu.edu.vn',
    password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
    info: {
      create: {
        name: 'Ths. Nguyễn Văn Linh',
        about:
          'Lập trình căn bản, Cấu trúc dữ liệu - Phân tích và thiết kế thuật toán',
        avatar: 'avatar/NVLinh.jpg',
        address: 'Đường 3/2 Khu II Đại học Cần Thơ',
        email: 'nvlinh@cit.ctu.edu.vn',
      },
    },
    setting: {
      create: {},
    },
    roles: {
      connect: [{ name: 'GIANG_VIEN_CHINH' }, { name: 'GIANG_VIEN_MOI_GIANG' }],
    },
    department: 'CONG_NGHE_PHAN_MEM' as $Enums.Deparment,
  },
  {
    email: 'lmbang@cit.ctu.edu.vn',
    password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
    info: {
      create: {
        name: 'Ks. Lê Minh Bằng',
        about: '',
        avatar: 'avatar/LMBang.jpg',
        address: 'Đường 3/2 Khu II Đại học Cần Thơ',
        email: 'lmbang@cit.ctu.edu.vn',
      },
    },
    setting: {
      create: {},
    },
    roles: {
      connect: [],
    },
    department: 'CONG_NGHE_PHAN_MEM' as $Enums.Deparment,
  },
  {
    email: 'ccdanh@cit.ctu.edu.vn',
    password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
    info: {
      create: {
        name: 'Ks. Cao Công Danh',
        about: '',
        avatar: 'avatar/CCDanh.jpg',
        address: 'Đường 3/2 Khu II Đại học Cần Thơ',
        email: 'ccdanh@cit.ctu.edu.vn',
      },
    },
    setting: {
      create: {},
    },
    roles: {
      connect: { name: 'GIANG_VIEN_TRO_GIANG' },
    },
    department: 'CONG_NGHE_PHAN_MEM' as $Enums.Deparment,
  },
];
