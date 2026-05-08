import {
  ECourseLevel,
  ECourseStatus,
  EExerciseStatus,
  ELessonArrange,
  ELessonStatus,
  ELessonType,
  EResultType,
  ETestStatus,
  EUserRole,
  EUserStatus,
} from '@/common/enums';
import { EIconColor, EIconName } from '@/components/Icon';
import { ETagType } from '@/components/Tag';

/* eslint-disable no-useless-escape */
export const REGEX = {
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
  url: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i,
  domain: /^[a-zA-Z0-9](?:[a-zA-Z0-9-.]*[a-zA-Z0-9])?$/i,
  alphabetic: /^[a-z\s]+$/i,
  alphanumerial: /^[a-z0-9\s]+$/i,
  numeric: /^\d+$/i,
  onlySpecialKey: /[$&+,:;=?@#|'<>.^*()%`~_!\-"\]\[\\}{'/\s]/i,
  phoneNumberVietnam: /(84|0[3|5|7|8|9])+([0-9]{8})/i,
};

export const dataTablePerPageOptions = [
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: '50', value: '50' },
  { label: '75', value: '75' },
  { label: '100', value: '100' },
];

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const MAX_FILE_IMAGE_SIZE = 5000000;

export const dataUserStatusOptions = [
  {
    value: EUserStatus.ACTIVE,
    label: 'Hoạt Động',
    data: { color: EIconColor.WHITE, tagType: ETagType.SUCCESS },
  },
  {
    value: EUserStatus.INACTIVE,
    label: 'Ngừng Hoạt Động',
    data: { color: EIconColor.WHITE, tagType: ETagType.DANGER },
  },
];

export const dataUserRoleOptions = [
  { value: EUserRole.MANAGER, label: 'Quản Trị Viên' },
  { value: EUserRole.STUDENT, label: 'Học Viên' },
];

export const dataCourseStatusOptions = [
  {
    value: ECourseStatus.PUBLIC,
    label: 'Công Khai',
    data: {
      text: 'Đang Tuyển Sinh',
      primaryColor: EIconColor.MOUNTAIN_MEADOW,
      color: EIconColor.WHITE,
      tagType: ETagType.SUCCESS,
    },
  },
  {
    value: ECourseStatus.COMING_SOON,
    label: 'Sắp Ra Mắt',
    data: { primaryColor: EIconColor.SUNGLOW, color: EIconColor.SHARK, tagType: ETagType.WARNING },
  },
  {
    value: ECourseStatus.PRIVATE,
    label: 'Riêng Tư',
    data: { primaryColor: EIconColor.ALIZARIN_CRIMSON, color: EIconColor.WHITE, tagType: ETagType.DANGER },
  },
];

export const dataCourseLevelOptions = [
  {
    value: ECourseLevel.LOW,
    label: 'Sơ Cấp',
    data: { primaryColor: EIconColor.MOUNTAIN_MEADOW, color: EIconColor.WHITE, tagType: ETagType.SUCCESS },
  },
  {
    value: ECourseLevel.MEDIUM,
    label: 'Trung Cấp',
    data: { primaryColor: EIconColor.SUNGLOW, color: EIconColor.SHARK, tagType: ETagType.WARNING },
  },
  {
    value: ECourseLevel.HIGH,
    label: 'Cao Cấp',
    data: { primaryColor: EIconColor.ALIZARIN_CRIMSON, color: EIconColor.WHITE, tagType: ETagType.DANGER },
  },
];

export const dataExerciseStatusOptions = [
  { value: EExerciseStatus.PUBLIC, label: 'Công Khai', data: { color: EIconColor.WHITE, tagType: ETagType.SUCCESS } },
  { value: EExerciseStatus.PRIVATE, label: 'Riêng Tư', data: { color: EIconColor.WHITE, tagType: ETagType.DANGER } },
];

export const dataLessonStatusOptions = [
  { value: ELessonStatus.PUBLIC, label: 'Công Khai', data: { color: EIconColor.WHITE, tagType: ETagType.SUCCESS } },
  { value: ELessonStatus.PRIVATE, label: 'Riêng Tư', data: { color: EIconColor.WHITE, tagType: ETagType.DANGER } },
];

export const dataLessonTypeOptions = [
  { value: ELessonType.MULTIPLE_CHOICE, label: 'Trắc Nghiệm', data: { iconName: EIconName.Checkbox } },
  { value: ELessonType.ESSAY, label: 'Tự Luận', data: { iconName: EIconName.Writing } },
];

export const dataLessonArrangeOptions = [
  { value: ELessonArrange.RANDOM, label: 'Ngẫu Nhiên', data: { iconName: EIconName.ArrowShuffle } },
  { value: ELessonArrange.ORDER, label: 'Thứ Tự', data: { iconName: EIconName.DirectionSign } },
];

export const dataTestStatusOptions = [
  { value: ETestStatus.PENDING, label: 'Chờ Chấm Điểm', data: { tagType: ETagType.WARNING, color: EIconColor.SHARK } },
  { value: ETestStatus.SUCCESS, label: 'Đã Chấm Điểm', data: { tagType: ETagType.SUCCESS, color: EIconColor.WHITE } },
];

export const dataResultTypeOptions = [
  {
    value: EResultType.VERY_GOOD,
    label: 'Xuất Sắc',
    data: { percent: 85, color: EIconColor.MOUNTAIN_MEADOW },
  },
  {
    value: EResultType.GOOD,
    label: 'Giỏi',
    data: { percent: 70, color: EIconColor.MOUNTAIN_MEADOW },
  },
  {
    value: EResultType.FAILY_GOOD,
    label: 'Khá',
    data: { percent: 65, color: EIconColor.SUNGLOW },
  },
  {
    value: EResultType.AVERAGE,
    label: 'Trung Bình Khá',
    data: { percent: 55, color: EIconColor.SUNGLOW },
  },
  {
    value: EResultType.BELOW_AVERAGE,
    label: 'Trung Bình Yếu',
    data: { percent: 50, color: EIconColor.ALIZARIN_CRIMSON },
  },
  {
    value: EResultType.WEAK,
    label: 'Yếu',
    data: { percent: 40, color: EIconColor.ALIZARIN_CRIMSON },
  },
  {
    value: EResultType.POOR,
    label: 'Kém',
    data: { percent: 0, color: EIconColor.ALIZARIN_CRIMSON },
  },
];

export const dataProcessOptions = [
  {
    value: 'good',
    label: 'Tốt',
    data: { percent: 70, tagType: ETagType.SUCCESS, color: EIconColor.WHITE },
  },
  {
    value: 'average',
    label: 'Trung Bình',
    data: { percent: 30, tagType: ETagType.WARNING, color: EIconColor.SHARK },
  },
  {
    value: 'poor',
    label: 'Kém',
    data: { percent: 0, tagType: ETagType.DANGER, color: EIconColor.WHITE },
  },
]