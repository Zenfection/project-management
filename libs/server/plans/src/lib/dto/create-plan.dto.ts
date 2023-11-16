import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreatePlanDto implements Prisma.PlanCreateInput {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsObject()
  owner: Prisma.UserCreateNestedOneWithoutOwnedPlansInput;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  tasks?: Prisma.TaskCreateNestedManyWithoutPlanInput;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  members?: Prisma.UserCreateNestedManyWithoutMemberPlansInput;

  @ApiProperty()
  @IsObject()
  category: Prisma.CategoryPlanCreateNestedOneWithoutPlansInput;

  // title: 'Xây Dựng Hệ Thống Quản Lý Nhân Sự',
  //   slug: 'xay-dung-he-thong-quan-ly-nhan-su',
  //   description:
  //     'Phát triển phần mềm quản lý nhân sự cho phép lưu trữ thông tin nhân viên, theo dõi quá trình tuyển dụng, đánh giá năng lực nhân viên, lập kế hoạch đào tạo và phát triển.',
  //   owner: {
  //     connect: { email: 'tmthai@cit.ctu.edu.vn' },
  //   },
  //   members: {
  //     connect: [
  //       { email: 'tvhoang@cit.ctu.edu.vn' },
  //       { email: 'hxhiep@cit.ctu.edu.vn' },
  //       { email: 'ncdanh@cit.ctu.edu.vn' },
  //     ],
  //   },
  //   category: { connect: { slug: 'phan-mem' } },
}
