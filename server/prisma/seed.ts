import { Info, Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  //   createDeparment();
  //   createPosition();
  //   createRole();
  createUser();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function createDeparment() {
  const dataDeparment = [
    { name: 'CONG_NGHE_PHAN_MEM' },
    { name: 'CONG_NGHE_THONG_TIN' },
    { name: 'HE_THONG_THONG_TIN' },
    { name: 'KHOA_HOC_MAY_TINH' },
    { name: 'MANG_MAY_TINH_VA_TRUYEN_THONG' },
    { name: 'TRUYEN_THONG_DA_PHUONG_TIEN' },
  ];

  const deparment = await prisma.deparment.createMany({
    data: dataDeparment,
    skipDuplicates: true,
  });
  console.log(
    'Created ' +
      deparment.count +
      ' deparment includes: ' +
      dataDeparment.map((item) => item.name).join(', '),
  );
}

async function createPosition() {
  const dataPosition = [
    //? Giảng viên
    { name: 'GIANG_VIEN' },
    { name: 'GIANG_VIEN_CHINH' },
    { name: 'GIANG_VIEN_CAO_CAP' },
    { name: 'GIANG_VIEN_MOI_GIANG' },
    { name: 'GIANG_VIEN_TRO_GIANG' },
    //? Khoa
    { name: 'TRUONG_KHOA' },
    { name: 'PHO_TRUONG_KHOA' },
    { name: 'HIEU_TRUONG' },
    { name: 'PHO_HIEU_TRUONG' },
    { name: 'PHO_GIAM_DOC_TT_CNPM' },
    { name: 'TRUONG_BO_PHAN_DAO_TAO_TT_CNPM' },
    { name: 'PHO_GIAM_DOC_TT_ĐT-TH' },
    { name: 'GIAM_DINH_TTTT-QTM' },
    { name: 'THU_KY_KHOA' },
    { name: 'TRUONG_PTN' },
    //? Công đoàn
    { name: 'PHO_CHU_TICH_BCHCĐ' },
    { name: 'CHU_TICH_CĐ' },
    { name: 'PHO_CHU_TICH_CĐ' },
    { name: 'TO_TRUONG_CĐ' },
    { name: 'TO_PHO_CĐ' },
    { name: 'BI_THU_CHI_BO' },
    { name: 'CHU_TICH_CĐ_KHOA' },
  ];
  const position = await prisma.position.createMany({
    data: dataPosition,
    skipDuplicates: true,
  });
  console.log(
    '\nCreated ' +
      position.count +
      ' position includes: ' +
      dataPosition.map((item) => item.name).join(', '),
  );
}

const createRole = async () => {};

async function createUser() {
  const dataUser = [
    {
      email: 'tmthai@cit.ctu.edu.vn',
      password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
      info: {
        create: {
          name: 'TS. Trương Minh Thái',
          about:
            'Cấu trúc dữ liệu, Quản lý dự án phần mềm - Nguyên lý xây dựng phần mềm - Nền tảng phần mềm nhúng và IoT',
          avatar: '',
          email: 'tmthai@cit.ctu.edu.vn',
        },
      },
      setting: {
        create: {},
      },
      roles: {},
      positions: {
        connect: [{ name: 'TRUONG_KHOA' }, { name: 'GIANG_VIEN_CHINH' }],
      },
      Deparment: {
        connect: { name: 'CONG_NGHE_PHAN_MEM' },
      },
    },
    {
      email: 'vhtram@cit.ctu.edu.vn',
      password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
      info: {
        create: {
          name: 'ThS. Võ Huỳnh Trâm',
          about:
            'Lập trình căn bản, Cấu trúc dữ liệu - Phân tích và thiết kế thuật toán - Phân tích yêu cầu phần mềm, Quản lý dự án phần mềm',
          avatar: '',
          email: 'vhtram@cit.ctu.edu.vns',
        },
      },
      setting: {
        create: {},
      },
      roles: {},
      positions: {
        connect: [{ name: 'BI_THU_CHI_BO' }, { name: 'PHO_TRUONG_KHOA' }],
      },
      Deparment: {
        connect: { name: 'CONG_NGHE_PHAN_MEM' },
      },
    },
    {
      email: 'hxhiep@cit.ctu.edu.vn',
      password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
      info: {
        create: {
          name: 'PGs. TS. Huỳnh Xuân Hiệp',
          about:
            'Nhập môn công nghệ phần mềm, Quản lý dự án phần mềm - Phân tích yêu cầu phần mềm, Kiến trúc và thiết kế phần mềm - Phát triển phần mềm nhúng',
          avatar: '',
          email: 'hxhiep@cit.ctu.edu.vn',
        },
      },
      setting: {
        create: {},
      },
      roles: {},
      positions: {
        connect: [{ name: 'GIANG_VIEN_CAO_CAP' }, { name: 'PHO_HIEU_TRUONG' }],
      },
      Deparment: {
        connect: { name: 'CONG_NGHE_PHAN_MEM' },
      },
    },
    {
      email: 'ttttuyen@cit.ctu.edu.vn',
      password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
      info: {
        create: {
          name: 'ThS. Trương Thị Thanh Tuyền',
          about:
            'Lập trình căn bản, Cấu trúc dữ liệu - Hệ thống Multi-Agent, Nguyên lý lập trình mô phỏng',
          avatar: '',
          email: 'ttttuyen@cit.ctu.edu.vn',
        },
      },
      setting: {
        create: {},
      },
      roles: {},
      positions: {
        connect: [{ name: 'GIANG_VIEN_CHINH' }, { name: 'PHO_CHU_TICH_BCHCĐ' }],
      },
      Deparment: {
        connect: { name: 'CONG_NGHE_PHAN_MEM' },
      },
    },
    {
      email: 'pplan@cit.ctu.edu.vn',
      password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
      info: {
        create: {
          name: 'TS. Phan Phương Lan',
          about:
            'Lập trình căn bản, Cấu trúc dữ liệu - Nhập môn công nghệ phần mềm, Quản lý dự án phần mềm - Bảo trì phần mềm',
          avatar: '',
          email: 'pplan@cit.ctu.edu.vn',
        },
      },
      setting: {
        create: {},
      },
      roles: {},
      positions: {
        connect: [{ name: 'GIANG_VIEN_CHINH' }, { name: 'CHU_TICH_CĐ_KHOA' }],
      },
      Deparment: {
        connect: { name: 'CONG_NGHE_PHAN_MEM' },
      },
    },
    {
      email: 'ncdanh@cit.ctu.edu.vn',
      password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
      info: {
        create: {
          name: 'TS. Nguyễn Công Danh',
          about:
            'Lập trình căn bản, Cấu trúc dữ liệu - Phát triển phần mềm tác nghiệp, Phát triển ứng dụng Windows - Đảm bảo chất lượng và kiểm thử phần mềm',
          avatar: '',
          email: 'ncdanh@cit.ctu.edu.vn',
        },
      },
      setting: {
        create: {},
      },
      roles: {},
      positions: {
        connect: [{ name: 'GIANG_VIEN' }, { name: 'PHO_CHU_TICH_CĐ' }],
      },
      Deparment: {
        connect: { name: 'CONG_NGHE_PHAN_MEM' },
      },
    },
    {
      email: 'txviet@ctu.edu.vn',
      password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
      info: {
        create: {
          name: 'TS. Trương Xuân Việt',
          about: 'Phân tích yêu cầu phần mềm - Nguyên lý xây dựng phần mềm',
          avatar: '',
          email: 'txviet@ctu.edu.vn',
        },
      },
      setting: {
        create: {},
      },
      roles: {},
      positions: {
        connect: [{ name: 'GIANG_VIEN' }, { name: 'PHO_GIAM_DOC_TT_CNPM' }],
      },
      Deparment: {
        connect: { name: 'CONG_NGHE_PHAN_MEM' },
      },
    },
    {
      email: 'cvloc@ctu.edu.vn',
      password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
      info: {
        create: {
          name: 'TS. Cù Vĩnh Lộc',
          about:
            'Cấu trúc dữ liệu - Lập trình Java - Kiến trúc thiết kế phần mềm',
          avatar: '',
          email: 'cvloc@ctu.edu.vn',
        },
      },
      setting: {
        create: {},
      },
      roles: {},
      positions: {
        connect: [
          { name: 'GIANG_VIEN' },
          { name: 'TRUONG_BO_PHAN_DAO_TAO_TT_CNPM' },
        ],
      },
      Deparment: {
        connect: { name: 'CONG_NGHE_PHAN_MEM' },
      },
    },
    {
      email: 'lhbao@cit.ctu.edu.vn',
      password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
      info: {
        create: {
          name: 'TS. Lâm Hoài Bảo',
          about:
            'Lập trình căn bản, Cấu trúc dữ liệu, Phân tích và thiết kế thuật toán - Lập trình .NET - Kiểm chứng mô hình, Tương tác người máy',
          avatar: '',
          email: 'lhbao@cit.ctu.edu.vn',
        },
      },
      setting: {
        create: {},
      },
      roles: {},
      positions: {
        connect: [{ name: 'GIANG_VIEN' }],
      },
      Deparment: {
        connect: { name: 'CONG_NGHE_PHAN_MEM' },
      },
    },
    {
      email: 'phcuong@cit.ctu.edu.vn',
      password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
      info: {
        create: {
          name: 'Ths. Phan Huy Cường',
          about: '',
          avatar: '',
          email: 'phcuong@cit.ctu.edu.vn',
        },
      },
      setting: {
        create: {},
      },
      roles: {},
      positions: {
        connect: [{ name: 'GIANG_VIEN' }, { name: 'PHO_GIAM_DOC_TT_ĐT-TH' }],
      },
      Deparment: {
        connect: { name: 'CONG_NGHE_PHAN_MEM' },
      },
    },
    {
      email: 'otmlinh@ctu.edu.vn',
      password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
      info: {
        create: {
          name: 'Ths. Ông Thị Mỹ Linh',
          about:
            'Cấu trúc dữ liệu - Lập trình .NET - Quản lý quy trình nghiệp vụ',
          avatar: '',
          email: 'otmlinh@ctu.edu.vn',
        },
      },
      setting: {
        create: {},
      },
      roles: {},
      positions: {
        connect: [{ name: 'GIANG_VIEN' }],
      },
      Deparment: {
        connect: { name: 'CONG_NGHE_PHAN_MEM' },
      },
    },
    {
      email: 'hqthai@cit.ctu.edu.vn',
      password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
      info: {
        create: {
          name: 'TS. Hồ Quang Thái',
          about:
            'Lập trình căn bản, Cấu trúc dữ liệu - Lập trình .NET, Lập trình Java',
          avatar: '',
          email: 'hqthai@cit.ctu.edu.vn',
        },
      },
      setting: {
        create: {},
      },
      roles: {},
      positions: {
        connect: [{ name: 'GIANG_VIEN' }],
      },
      Deparment: {
        connect: { name: 'CONG_NGHE_PHAN_MEM' },
      },
    },
    {
      email: 'tvhoang@cit.ctu.edu.vn',
      password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
      info: {
        create: {
          name: 'TS. Trần Văn Hoàng',
          about:
            'Lập trình căn bản, Cấu trúc dữ liệu - Phân tích và thiết kế thuật toán - Phân tích yêu cầu phần mềm.',
          avatar: '',
          email: 'tvhoang@cit.ctu.edu.vn',
        },
      },
      setting: {
        create: {},
      },
      roles: {},
      positions: {
        connect: [{ name: 'GIANG_VIEN' }],
      },
      Deparment: {
        connect: { name: 'CONG_NGHE_PHAN_MEM' },
      },
    },
    {
      email: 'hqnghi@cit.ctu.edu.vn',
      password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
      info: {
        create: {
          name: 'TS. Huỳnh Quang Nghi',
          about:
            'Lập trình căn bản, Cấu trúc dữ liệu - Lập trình .NET, Lập trình Java - Bảo trì phần mềm, Nguyên lý lập trình mô phỏng',
          avatar: '',
          email: 'hqnghi@cit.ctu.edu.vn',
        },
      },
      setting: {
        create: {},
      },
      roles: {},
      positions: {
        connect: [{ name: 'GIANG_VIEN' }, { name: 'THU_KY_KHOA' }],
      },
      Deparment: {
        connect: { name: 'CONG_NGHE_PHAN_MEM' },
      },
    },
    {
      email: 'chgiang@cit.ctu.edu.vn',
      password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
      info: {
        create: {
          name: 'ThS. Cao Hoàng Giang',
          about:
            'Lập trình căn bản, Cấu trúc dữ liệu - Lập trình .NET, Lập trình Java',
          avatar: '',
          email: 'chgiang@cit.ctu.edu.vn',
        },
      },
      setting: {
        create: {},
      },
      roles: {},
      positions: {
        connect: [{ name: 'GIANG_VIEN' }],
      },
      Deparment: {
        connect: { name: 'CONG_NGHE_PHAN_MEM' },
      },
    },
    {
      email: 'cxphuong@ctu.edu.vn',
      password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
      info: {
        create: {
          name: 'Ths. Châu Xuân Phương',
          about: 'Lập trình căn bản, Cấu trúc dữ liệu',
          avatar: '',
          email: 'cxphuong@ctu.edu.vn',
        },
      },
      setting: {
        create: {},
      },
      roles: {},
      positions: {
        connect: [{ name: 'GIANG_VIEN' }],
      },
      Deparment: {
        connect: { name: 'CONG_NGHE_PHAN_MEM' },
      },
    },
    {
      email: 'nvlinh@cit.ctu.edu.vn',
      password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
      info: {
        create: {
          name: 'Ths. Nguyễn Văn Linh',
          about:
            'Lập trình căn bản, Cấu trúc dữ liệu - Phân tích và thiết kế thuật toán',
          avatar: '',
          email: 'nvlinh@cit.ctu.edu.vn',
        },
      },
      setting: {
        create: {},
      },
      roles: {},
      positions: {
        connect: [
          { name: 'GIANG_VIEN_CHINH' },
          { name: 'GIANG_VIEN_MOI_GIANG' },
        ],
      },
      Deparment: {
        connect: { name: 'CONG_NGHE_PHAN_MEM' },
      },
    },
    {
      email: 'lmbang@cit.ctu.edu.vn',
      password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
      info: {
        create: {
          name: 'Ks. Lê Minh Bằng',
          about: '',
          avatar: '',
          email: 'lmbang@cit.ctu.edu.vn',
        },
      },
      setting: {
        create: {},
      },
      roles: {},
      positions: {
        connect: [],
      },
      Deparment: {
        connect: { name: 'CONG_NGHE_PHAN_MEM' },
      },
    },
    {
      email: 'ccdanh@cit.ctu.edu.vn',
      password: '$2b$10$n.MYQjX46ah9sutf2rADPu3.BFI/5D3TWf3OyHxBtN4q4qWNUqXvK',
      info: {
        create: {
          name: 'Ks. Cao Công Danh',
          about: '',
          avatar: '',
          email: 'ccdanh@cit.ctu.edu.vn',
        },
      },
      setting: {
        create: {},
      },
      roles: {},
      positions: {
        connect: { name: 'GIANG_VIEN_TRO_GIANG' },
      },
      Deparment: {
        connect: { name: 'CONG_NGHE_PHAN_MEM' },
      },
    },
  ];

  dataUser.forEach(async (data) => {
    try {
      await prisma.user.create({
        data,
      });
    } catch (error) {
      console.log('Error create user: ' + data.email);
      console.log(error);
    }
  });

  console.log(
    '\nCreated ' +
      dataUser.length +
      ' user includes: ' +
      dataUser.map((item) => item.email).join(', '),
  );
}
