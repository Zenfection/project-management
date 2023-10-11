import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Setting } from '@prisma/client';
import { IsEnum, IsInt } from 'class-validator';

export class SettingEntity implements Setting {
  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsEnum($Enums.ThemeSetting)
  theme: $Enums.ThemeSetting;

  @ApiProperty()
  @IsEnum($Enums.SchemeSetting)
  scheme: $Enums.SchemeSetting;

  @ApiProperty()
  @IsEnum($Enums.LanguageSetting)
  language: $Enums.LanguageSetting;

  @ApiProperty()
  @IsEnum($Enums.LayoutSetting)
  layout: $Enums.LayoutSetting;

  createdAt: Date;
  updatedAt: Date;
}
