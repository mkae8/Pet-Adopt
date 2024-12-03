/*
 * =====================================================================================
 * DISCLAIMER:
 * =====================================================================================
 * This localization file is a community contribution and is not officially maintained
 * by Clerk. It has been provided by the community and may not be fully aligned
 * with the current or future states of the main application. Clerk does not guarantee
 * the accuracy, completeness, or timeliness of the translations in this file.
 * Use of this file is at your own risk and discretion.
 * =====================================================================================
 */

import type { LocalizationResource } from "@clerk/types";

export const mnMN: LocalizationResource = {
  locale: "mn-MN",
  backButton: "Буцах",
  badge__default: "Анхдагч",
  badge__otherImpersonatorDevice: "Бусад дуурайгч төхөөрөмж",
  badge__primary: "Үндсэн",
  badge__requiresAction: "Үйлдэл шаардлагтай",
  badge__thisDevice: "Энэ төхөөрөмж",
  badge__unverified: "Баталгаажаагүй",
  badge__userDevice: "Хэрэглэгчийн төхөөрөмж",
  badge__you: "Чи",
  createOrganization: {
    formButtonSubmit: "Байгуулга үүсгэх",
    invitePage: {
      formButtonReset: "Алгасах",
    },
    title: "Байгуулга үүсгэх",
  },
  dates: {
    lastDay: "Өчигдөр {{ date | timeString('mn-MN') }} цагт",
    next6Days:
      "{{ date | weekday('mn-MN','long') }} -с {{ date | timeString('mn-MN') }} хүртэл",
    nextDay: "Маргааш {{ date | timeString('mn-MN') }} цагт",
    numeric: "{{ date | numeric('mn-MN') }}",
    previous6Days:
      "{{ date | weekday('mn-MN','long') }} -c {{ date | timeString('mn-MN') }} хүртэл",
    sameDay: "Өнөөдөр {{ date | timeString('mn-MN') }} цагт",
  },
  dividerText: "эсвэл",
  footerActionLink__useAnotherMethod: "Өөр арга ашиглах",
  footerPageLink__help: "Тусламж",
  footerPageLink__privacy: "Нууцлал",
  footerPageLink__terms: "Нөхцөл",
  formButtonPrimary: "Үргэлжлүүлэх",
  formButtonPrimary__verify: "Баталгаажуулах",
  formFieldAction__forgotPassword: "Нууц үгээ мартсан?",
  formFieldError__matchingPasswords: "Нууц үг таарч байна.",
  formFieldError__notMatchingPasswords: "Нууц үг таарахгүй байна.",
  formFieldError__verificationLinkExpired:
    "Баталгаажуулах холбоосын хугацаа дууссан. Шинэ холбоос хүсэлт гаргана уу.",
  formFieldHintText__optional: "Сонголтоор",
  formFieldHintText__slug:
    "Slug нь хүн унших боломжтой ID бөгөөд өвөрмөц байх ёстой. Энэ нь ихэвчлэн URL-д ашиглагддаг.",
  formFieldInputPlaceholder__backupCode: "Нөөц код",
  formFieldInputPlaceholder__confirmDeletionUserAccount: "Бүртгэл устгах",
  formFieldInputPlaceholder__emailAddress: "Имэйл хаяг",
  formFieldInputPlaceholder__emailAddress_username:
    "Имэйл хаяг эсвэл хэрэглэгчийн нэр",
  formFieldInputPlaceholder__emailAddresses:
    "example@email.com, example2@email.com",
  formFieldInputPlaceholder__firstName: "Нэр",
  formFieldInputPlaceholder__lastName: "Овог",
  formFieldInputPlaceholder__organizationDomain: "Байгууллагын домэйн",
  formFieldInputPlaceholder__organizationDomainEmailAddress:
    "Байгууллагын домэйн имэйл хаяг",
  formFieldInputPlaceholder__organizationName: "Байгууллагын нэр",
  formFieldInputPlaceholder__organizationSlug: "my-org",
  formFieldInputPlaceholder__password: "Нууц үг",
  formFieldInputPlaceholder__phoneNumber: "Утасны дугаар",
  formFieldInputPlaceholder__username: "Хэрэглэгчийн нэр",
  formFieldLabel__automaticInvitations:
    "Энэ домэйны автомат урилгыг идэвхжүүлэх",
  formFieldLabel__backupCode: "Нөөц код",
  formFieldLabel__confirmDeletion: "Баталгаажуулалт",
  formFieldLabel__confirmPassword: "Нууц үгээ баталгаажуулна уу",
  formFieldLabel__currentPassword: "Одоогын нууц үг",
  formFieldLabel__emailAddress: "Имэйл хаяг",
  formFieldLabel__emailAddress_username: "Имэйл хаяг эсвэл хэрэглэгчийн нэр",
  formFieldLabel__emailAddresses: "Имэйл хаяг",
  formFieldLabel__firstName: "Нэр",
  formFieldLabel__lastName: "Овог",
  formFieldLabel__newPassword: "Шинэ нууц үг",
  formFieldLabel__organizationDomain: "Домэйн",
  formFieldLabel__organizationDomainDeletePending:
    "Хүлээгдэж буй урилга болон саналуудыг устгах",
  formFieldLabel__organizationDomainEmailAddress: "Баталгаажуулах имэйл хаяг",
  formFieldLabel__organizationDomainEmailAddressDescription:
    "Код хүлээн авч, энэ домэйныг баталгаажуулахын тулд энэ домайн доор имэйл хаягаа оруулна уу.",
  formFieldLabel__organizationName: "Байгууллагын нэр",
  formFieldLabel__organizationSlug: "Slug",
  formFieldLabel__passkeyName: undefined,
  formFieldLabel__password: "Нууц үг",
  formFieldLabel__phoneNumber: "Утасны дугаар",
  formFieldLabel__role: "Үүрэг",
  formFieldLabel__signOutOfOtherSessions: "Бусад бүх төхөөрөмжөөс гарах",
  formFieldLabel__username: "Хэрэглэгчийн нэр",
  impersonationFab: {
    action__signOut: "Гарах",
    title: "{{identifier}}-р нэвтэрсэн",
  },
  maintenanceMode: undefined,
  membershipRole__admin: "Админ",
  membershipRole__basicMember: "Гишүүн",
  membershipRole__guestMember: "Зочин",
  organizationList: {
    action__createOrganization: "Байгууллага үүсгэх",
    action__invitationAccept: "Нэгдэх",
    action__suggestionsAccept: "Нэгдэх хүсэлт",
    createOrganization: "Байгууллага үүсгэх",
    invitationAcceptedLabel: "Нэгдсэн",
    subtitle: "{{applicationName}} руу үргэлжлүүлэх",
    suggestionsAcceptedLabel: "Зөвшөөрөл хүлээгдэж байна",
    title: "Бүртгэл сонгоно уу",
    titleWithoutPersonal: "Байгууллага сонгоно уу",
  },
  organizationProfile: {
    badge__automaticInvitation: "Автомат урилга",
    badge__automaticSuggestion: "Автомат саналууд",
    badge__manualInvitation: "Автомат бүртгэл байхгүй",
    badge__unverified: "Баталгаажаагүй",
    createDomainPage: {
      subtitle:
        "Баталгаажуулахын тулд домэйн нэмнэ үү. Энэ домэйны имэйл хаягтай хэрэглэгчид байгууллагад автоматаар нэгдэх эсвэл элсэх хүсэлт гаргах боломжтой.",
      title: "Домэйн нэмэх",
    },
    invitePage: {
      detailsTitle__inviteFailed:
        "Урилгыг илгээх боломжгүй байна. Дараах и-мэйл хаягуудад аль хэдийн хүлээгдэж буй урилгууд байна: {{email_addresses}}.",
      formButtonPrimary__continue: "Урилга илгээх",
      selectDropdown__role: "Үүрэг сонгох",
      subtitle:
        "Нэг буюу хэд хэдэн имэйл хаягийг хоосон зай эсвэл таслалаар тусгаарлан оруулна уу.",
      successMessage: "Урилгыг амжилттай илгээсэн",
      title: "Шинэ гишүүдийг урих",
    },
    membersPage: {
      action__invite: "Урих",
      activeMembersTab: {
        menuAction__remove: "Гишүүнийг хасах",
        tableHeader__actions: undefined,
        tableHeader__joined: "Нэгдсэн",
        tableHeader__role: "Үүрэг",
        tableHeader__user: "Хэрэглэгч",
      },
      detailsTitle__emptyRow: "Харуулах гишүүн алга",
      invitationsTab: {
        autoInvitations: {
          headerSubtitle:
            "Байгууллагатайгаа имэйлийн домайн холбож хэрэглэгчдийг урина уу. Тохирох цахим шуудангийн домайнаар бүртгүүлсэн хүн хүссэн үедээ байгууллагад элсэх боломжтой.",
          headerTitle: "Автомат урилга",
          primaryButton: "Баталгаажсан домайнуудыг удирдах",
        },
        table__emptyRow: "Урилга байхгүй",
      },
      invitedMembersTab: {
        menuAction__revoke: "Урилгыг хүчингүй болгох",
        tableHeader__invited: "Урьсан",
      },
      requestsTab: {
        autoSuggestions: {
          headerSubtitle:
            "Тохирох имэйл домэйнээр бүртгүүлсэн хэрэглэгчид танай байгууллагад элсэх хүсэлт гаргах саналыг харах боломжтой болно.",
          headerTitle: "Автомат саналууд",
          primaryButton: "Баталгаажсан домайнуудыг удирдах",
        },
        menuAction__approve: "Зөвшөөрөх",
        menuAction__reject: "Татгалзах",
        tableHeader__requested: "Хүссэн хандалт",
        table__emptyRow: "Хүсэлт алга",
      },
      start: {
        headerTitle__invitations: "Урилга",
        headerTitle__members: "Гишүүд",
        headerTitle__requests: "Хүсэлтүүд",
      },
    },
    navbar: {
      description: "Байгууллагаа удирдих",
      general: "Ерөнхий",
      members: "Гишүүд",
      title: "Байгууллага",
    },
    profilePage: {
      dangerSection: {
        deleteOrganization: {
          actionDescription:
            'Үргэлжлүүлэхийн тулд доор "{{organizationName}}" гэж бичнэ үү.',
          messageLine1: "Та энэ байгууллагыг устгахдаа итгэлтэй байна уу?",
          messageLine2:
            "Энэ үйлдэл нь бүр мөсөн устгах бөгөөд сэргээх боломжгүй юм.",
          successMessage: "Та байгууллагыг устгасан байна.",
          title: "Байгууллага устгах",
        },
        leaveOrganization: {
          actionDescription:
            'Үргэлжлүүлэхийн тулд доор "{{organizationName}}" гэж бичнэ үү.',
          messageLine1:
            "Та энэ байгууллагаас гарахдаа итгэлтэй байна уу? Та энэ байгууллага болон түүний програмуудад хандах эрхээ алдах болно.",
          messageLine2:
            "Энэ үйлдэл нь бүр мөсөн устгах бөгөөд сэргээх боломжгүй юм.",
          successMessage: "Та байгууллагаас гарсан байна.",
          title: "Байгууллагаас гарах",
        },
        title: "Аюултай",
      },
      domainSection: {
        menuAction__manage: "Удирдах",
        menuAction__remove: "Устгах",
        menuAction__verify: "Баталгаажуулах",
        primaryButton: "Домэйн нэмэх",
        subtitle:
          "Хэрэглэгчид байгууллагад автоматаар нэгдэх эсвэл баталгаажуулсан имэйл домэйн дээр үндэслэн элсэх хүсэлт гаргахыг зөвшөөрнө үү.",
        title: "Баталгаажсан домэйнууд",
      },
      successMessage: "Байгууллага шинэчлэгдсэн.",
      title: "Профайлыг шинэчлэх",
    },
    removeDomainPage: {
      messageLine1: "{{domain}} имэйл домэйныг устгах болно.",
      messageLine2:
        "Үүний дараа хэрэглэгчид байгууллагад автоматаар нэгдэх боломжгүй болно.",
      successMessage: "{{domain}} устгагдсан.",
      title: "Домэйн устгах",
    },
    start: {
      headerTitle__general: "Ерөнхий",
      headerTitle__members: "Гишүүд",
      profileSection: {
        primaryButton: "Профайлыг шинэчлэх",
        title: "Байгуулгын профайл",
        uploadAction__title: "Лого",
      },
    },
    verifiedDomainPage: {
      dangerTab: {
        calloutInfoLabel:
          "Энэ домэйныг устгаснаар уригдсан хэрэглэгчдэд нөлөөлнө.",
        removeDomainActionLabel__remove: "Домэйн устгах",
        removeDomainSubtitle:
          "Энэ домэйныг баталгаажуулсан домайнуудаас устгах",
        removeDomainTitle: "Домэйн устгах",
      },
      enrollmentTab: {
        automaticInvitationOption__description:
          "Хэрэглэгчид бүртгүүлэхдээ байгууллагад автоматаар нэгдэхийг урьж, хүссэн үедээ элсэх боломжтой.",
        automaticInvitationOption__label: "Автомат урилга",
        automaticSuggestionOption__description:
          "Хэрэглэгчид элсэх хүсэлт гаргах саналыг хүлээн авдаг боловч тухайн байгууллагад элсэхээс өмнө админаас зөвшөөрөл авсан байх ёстой.",
        automaticSuggestionOption__label: "Автомат санал",
        calloutInfoLabel:
          "Бүртгэлийн горимыг өөрчлөх нь зөвхөн шинэ хэрэглэгчдэд нөлөөлнө.",
        calloutInvitationCountLabel:
          "Хэрэглэгчдэд илгээсэн хүлээгдэж буй урилгууд: {{count}}",
        calloutSuggestionCountLabel:
          "Хэрэглэгчдэд илгээсэн хүлээгдэж буй саналууд: {{count}}",
        manualInvitationOption__description:
          "Хэрэглэгчийг зөвхөн гар аргаар байгууллагад урих боломжтой.",
        manualInvitationOption__label: "Автомат бүртгэл байхгүй",
        subtitle:
          "Энэ домэйны хэрэглэгчид байгууллагад хэрхэн элсэхийг сонгоно уу.",
      },
      start: {
        headerTitle__danger: "Аюултай",
        headerTitle__enrollment: "Элсэлтийн сонголтууд",
      },
      subtitle:
        "{{domain}} домэйн одоо баталгаажсан. Бүртгэлийн горимыг сонгон үргэлжлүүлнэ үү.",
      title: "{{домайн}}-г шинэчлэх",
    },
    verifyDomainPage: {
      formSubtitle:
        "Таны имэйл хаяг руу илгээсэн баталгаажуулах кодыг оруулна уу",
      formTitle: "Баталгаажуулах код",
      resendButton: "Код хүлээж аваагүй юу? Дахин илгээх",
      subtitle: "{{domainName}} домайныг имэйлээр баталгаажуулах шаардлагатай.",
      subtitleVerificationCodeScreen:
        "Баталгаажуулах кодыг {{emailAddress}} руу илгээсэн. Үргэлжлүүлэхийн тулд кодыг оруулна уу.",
      title: "Домэйн баталгаажуулах",
    },
  },
  organizationSwitcher: {
    action__createOrganization: "Байгууллага үүсгэх",
    action__invitationAccept: "Нэгдэх",
    action__manageOrganization: "Удирдах",
    action__suggestionsAccept: "Нэгдэх хүсэлт",
    notSelected: "Байгууллага сонгогдоогүй байна",
    personalWorkspace: "Хувийн бүртгэл",
    suggestionsAcceptedLabel: "Зөвшөөрөл хүлээгдэж байна",
  },
  paginationButton__next: "Дараах",
  paginationButton__previous: "Өмнөх",
  paginationRowText__displaying: "Харуулж байна",
  paginationRowText__of: "аас",
  signIn: {
    accountSwitcher: {
      action__addAccount: "Бүртгэл нэмэх",
      action__signOutAll: "Бүх бүртгэлээс гарна уу",
      subtitle: "Үргэлжлүүлэхийг хүссэн бүртгэлээ сонгоно уу.",
      title: "Бүртгэл сонгоно уу",
    },
    alternativeMethods: {
      actionLink: "Тусламж",
      actionText: "Эдгээрийн аль нь ч байхгүй юу?",
      blockButton__backupCode: "Нөөц код ашиглана уу",
      blockButton__emailCode: "{{identifier}} имэйлруу код илгээх",
      blockButton__emailLink: "{{identifier}} имэйлруу холбоос силгээх ",
      blockButton__passkey: "Passkey-р нэвтэрнэ үү",
      blockButton__password: "Нууц үгээрээ нэвтэрнэ үү",
      blockButton__phoneCode: "{{identifier}} руу SMS илгээх",
      blockButton__totp: "Authenticator програмаа ашиглана уу",
      getHelp: {
        blockButton__emailSupport: "Имэйлийн дэмжлэг",
        content:
          "Хэрэв та бүртгэлдээ нэвтрэхэд хүндрэлтэй байгаа бол бидэн рүү имэйл илгээгээрэй, бид тантай хамтран ажиллах болно.",
        title: "Тусламж",
      },
      subtitle:
        "Асуудалтай тулгарч байна уу? Та нэвтрэхийн тулд эдгээр аргуудын аль нэгийг ашиглаж болно.",
      title: "Өөр аргыг ашигла",
    },
    backupCodeMfa: {
      subtitle:
        "Таны нөөц код нь хоёр шатлалт баталгаажуулалтыг тохируулах үед авсан код юм.",
      title: "Нөөц код оруулна уу",
    },
    emailCode: {
      formTitle: "Баталгаажуулах код",
      resendButton: "Код хүлээж аваагүй юу? Дахин илгээх",
      subtitle: "{{applicationName}} руу үргэлжлүүлэхийн тулд",
      title: "Имэйлээ шалгана уу",
    },
    emailLink: {
      clientMismatch: {
        subtitle: undefined,
        title: undefined,
      },
      expired: {
        subtitle: "Үргэлжлүүлэхийн тулд анхны таб руу буцна уу.",
        title: "Энэ баталгаажуулах холбоосын хугацаа дууссан",
      },
      failed: {
        subtitle: "Үргэлжлүүлэхийн тулд анхны таб руу буцна уу.",
        title: "Энэ баталгаажуулах холбоос хүчингүй байна",
      },
      formSubtitle:
        "Таны имэйл рүү илгээсэн баталгаажуулах холбоосыг ашиглана уу",
      formTitle: "Баталгаажуулах холбоос",
      loading: {
        subtitle: "Таныг удахгүй дахин чиглүүлэх болно",
        title: "Нэвтэрч байна...",
      },
      resendButton: "Холбоос хүлээж аваагүй юу? Дахин илгээх",
      subtitle: "{{applicationName}} руу үргэлжлүүлэхийн тулд",
      title: "Имэйлээ шалгана уу",
      unusedTab: {
        title: "Та энэ табыг хааж болно",
      },
      verified: {
        subtitle: "Таныг удахгүй дахин чиглүүлэх болно",
        title: "Амжилттай нэвтэрлээ",
      },
      verifiedSwitchTab: {
        subtitle: "Үргэлжлүүлэхийн тулд эх таб руу буцна уу",
        subtitleNewTab: "Үргэлжлүүлэхийн тулд шинээр нээгдсэн таб руу буцна уу",
        titleNewTab: "Өөр таб дээр нэвтэрсэн",
      },
    },
    forgotPassword: {
      formTitle: "Нууц үг шинэчлэх код",
      resendButton: "Код хүлээж аваагүй юу? Дахин илгээх",
      subtitle: "нууц үгээ шинэчлэхийн тулд",
      subtitle_email: "Эхлээд таны имэйл ID руу илгээсэн кодыг оруулна уу",
      subtitle_phone: "Эхлээд утсандаа илгээсэн кодыг оруулна уу",
      title: "Нууц үг шинэчлэх",
    },
    forgotPasswordAlternativeMethods: {
      blockButton__resetPassword: "Нууц үг шинэчлэх",
      label__alternativeMethods: "Эсвэл өөр аргаар нэвтэрнэ үү",
      title: "Нууц үгээ мартсан?",
    },
    noAvailableMethods: {
      message:
        "Нэвтрэхийг үргэлжлүүлэх боломжгүй. Баталгаажуулах хүчин зүйл алга.",
      subtitle: "Алдаа гарлаа",
      title: "Нэвтрэх боломжгүй",
    },
    passkey: {
      subtitle:
        "Passkey-ээ ашигласнаар таныг мөн болохыг баталгаажуулна. Таны төхөөрөмж хурууны хээ, нүүр эсвэл дэлгэцийн түгжээг асууж магадгүй.",
      title: "Passkey ашиглана уу",
    },
    password: {
      actionLink: "Өөр аргыг ашигла",
      subtitle: "Бүртгэлтэй холбоотой нууц үгээ оруулна уу",
      title: "Нууц үгээ оруулна уу",
    },
    passwordPwned: {
      title: undefined,
    },
    phoneCode: {
      formTitle: "Баталгаажуулах код",
      resendButton: "Код хүлээж аваагүй юу? Дахин илгээх",
      subtitle: "{{applicationName}} руу үргэлжлүүлэхийн тулд",
      title: "Утсаа шалгана уу",
    },
    phoneCodeMfa: {
      formTitle: "Баталгаажуулах код",
      resendButton: "Код хүлээж аваагүй юу? Дахин илгээх",
      subtitle:
        "Үргэлжлүүлэхийн тулд утсандаа илгээсэн баталгаажуулах кодыг оруулна уу",
      title: "Утсаа шалгана уу",
    },
    resetPassword: {
      formButtonPrimary: "Нууц үг сэргээх",
      requiredMessage:
        "Аюулгүй байдлын үүднээс нууц үгээ шинэчлэх шаардлагатай.",
      successMessage:
        "Таны нууц үг амжилттай өөрчлөгдсөн байна. Таныг нэвтрүүлж байна, түр хүлээнэ үү.",
      title: "Шинэ нууц үг тохируулна уу",
    },
    resetPasswordMfa: {
      detailsLabel:
        "Нууц үгээ шинэчлэхээс өмнө бид таны хувийн мэдээллийг баталгаажуулах шаардлагатай.",
    },
    start: {
      actionLink: "Бүртгүүлэх",
      actionLink__join_waitlist: undefined,
      actionLink__use_email: "Имэйл ашиглах",
      actionLink__use_email_username: "Имэйл эсвэл хэрэглэгчийн нэр ашиглах",
      actionLink__use_passkey: "Passkey ашиглах",
      actionLink__use_phone: "Утсаа ашиглах",
      actionLink__use_username: "Хэрэглэгчийн нэрийг ашиглах",
      actionText: "Бүртгэлгүй юу?",
      actionText__join_waitlist: undefined,
      subtitle: "Тавтай морил! Үргэлжлүүлэхийн тулд нэвтэрнэ үү",
      title: "{{applicationName}} руу нэвтрэх",
    },
    totpMfa: {
      formTitle: "Баталгаажуулах код",
      subtitle:
        "Үргэлжлүүлэхийн тулд authenticator апп-аар үүсгэсэн баталгаажуулах кодыг оруулна уу",
      title: "Two-step баталгаажуулалт",
    },
  },
  signInEnterPasswordTitle: "Нууц үгээ оруулна уу",
  signUp: {
    continue: {
      actionLink: "Нэвтрэх",
      actionText: "Бүртгэлтэй юу?",
      subtitle:
        "Үргэлжлүүлэхийн тулд үлдсэн дэлгэрэнгүй мэдээллийг бөглөнө үү.",
      title: "Дутуу талбаруудыг бөглөнө үү",
    },
    emailCode: {
      formSubtitle:
        "Таны имэйл хаяг руу илгээсэн баталгаажуулах кодыг оруулна уу",
      formTitle: "Баталгаажуулах код",
      resendButton: "Код хүлээж аваагүй юу? Дахин илгээх",
      subtitle: "Таны имэйл рүү илгээсэн баталгаажуулах кодыг оруулна уу",
      title: "Имэйлээ баталгаажуулна уу",
    },
    emailLink: {
      clientMismatch: {
        subtitle: undefined,
        title: undefined,
      },
      formSubtitle:
        "Таны имэйл хаяг руу илгээсэн баталгаажуулах холбоосыг ашиглана уу",
      formTitle: "Баталгаажуулах холбоос",
      loading: {
        title: "Бүртгүүлж байна...",
      },
      resendButton: "Холбоос хүлээж аваагүй юу? Дахин илгээх",
      subtitle: "{{applicationName}} руу үргэлжлүүлэхийн тулд",
      title: "Имэйлээ баталгаажуулна уу",
      verified: {
        title: "Амжилттай бүртгүүллээ",
      },
      verifiedSwitchTab: {
        subtitle: "Үргэлжлүүлэхийн тулд шинээр нээгдсэн таб руу буцна уу",
        subtitleNewTab: "Үргэлжлүүлэхийн тулд өмнөх таб руу буцна уу",
        title: "Имэйлийг амжилттай баталгаажууллаа",
      },
    },
    legalConsent: {
      checkbox: {
        label__onlyPrivacyPolicy: undefined,
        label__onlyTermsOfService: undefined,
        label__termsOfServiceAndPrivacyPolicy: undefined,
      },
      continue: {
        subtitle: undefined,
        title: undefined,
      },
    },
    phoneCode: {
      formSubtitle:
        "Таны утасны дугаар руу илгээсэн баталгаажуулах кодыг оруулна уу",
      formTitle: "Баталгаажуулах код",
      resendButton: "Код хүлээж аваагүй юу? Дахин илгээх",
      subtitle: "Таны утсанд илгээсэн баталгаажуулах кодыг оруулна уу",
      title: "Утсаар баталгаажуулах",
    },
    restrictedAccess: {
      actionLink: undefined,
      actionText: undefined,
      blockButton__emailSupport: undefined,
      blockButton__joinWaitlist: undefined,
      subtitle: undefined,
      subtitleWaitlist: undefined,
      title: undefined,
    },
    start: {
      actionLink: "Нэвтрэх",
      actionLink__use_email: undefined,
      actionLink__use_phone: undefined,
      actionText: "Бүртгэлтэй юу?",
      subtitle:
        "Тавтай морил! Эхлэхийн тулд дэлгэрэнгүй мэдээллийг бөглөнө үү.",
      title: "Бүртгэл үүсгэх",
    },
  },
  socialButtonsBlockButton: "{{provider|titleize}}-р үргэлжлүүлэх",
  socialButtonsBlockButtonManyInView: undefined,
  unstable__errors: {
    already_a_member_in_organization: undefined,
    captcha_invalid:
      "Аюулгүй байдлын баталгаажуулалт амжилтгүй болсны улмаас бүртгүүлж чадсангүй. Дахин оролдохын тулд хуудсыг сэргээнэ үү эсвэл нэмэлт тусламж авахын тулд тусламж авахаар холбогдоно уу.",
    captcha_unavailable:
      "Ботын баталгаажуулалт амжилтгүй болсны улмаас бүртгүүлж чадсангүй. Дахин оролдохын тулд хуудсыг сэргээнэ үү эсвэл нэмэлт тусламж авахын тулд тусламж авахаар холбогдоно уу.",
    form_code_incorrect: "Маягтын код буруу байна",
    form_identifier_exists: "Тодорхойлогч аль хэдийн байна.",
    form_identifier_exists__email_address: undefined,
    form_identifier_exists__phone_number: undefined,
    form_identifier_exists__username: undefined,
    form_identifier_not_found: "Тодорхойлогч олдсонгүй.",
    form_param_format_invalid: "Параметрийн формат буруу.",
    form_param_format_invalid__email_address:
      "Имэйл хаяг нь хүчинтэй имэйл хаяг байх ёстой.",
    form_param_format_invalid__phone_number:
      "Утасны дугаар нь олон улсын хүчинтэй форматтай байх ёстой",
    form_param_max_length_exceeded__first_name:
      "Нэр нь 256 тэмдэгтээс хэтрэхгүй байх ёстой.",
    form_param_max_length_exceeded__last_name:
      "Овог 256 тэмдэгтээс хэтрэхгүй байх ёстой.",
    form_param_max_length_exceeded__name:
      "Нэр 256 тэмдэгтээс хэтрэхгүй байх ёстой.",
    form_param_nil: "Параметр байхгүй байна.",
    form_param_value_invalid: undefined,
    form_password_incorrect: "Нууц үг буруу байна.",
    form_password_length_too_short: "Нууц үгийн урт хэт богино байна.",
    form_password_not_strong_enough:
      "Таны нууц үг хангалттай хүчтэй биш байна.",
    form_password_pwned:
      "Энэ нууц үгийг зөрчлийн нэг хэсэг гэж олсон тул ашиглах боломжгүй, оронд нь өөр нууц үг оролдоно уу.",
    form_password_pwned__sign_in: undefined,
    form_password_size_in_bytes_exceeded:
      "Энэ нууц үгийг зөрчлийн нэг хэсэг гэж олсон тул ашиглах боломжгүй. Өөр нууц үг оруулж үзнэ үү.",
    form_password_validation_failed: "Нууц үг буруу",
    form_username_invalid_character:
      "Хэрэглэгчийн нэр буруу тэмдэгт агуулж байна.",
    form_username_invalid_length: "Хэрэглэгчийн нэр буруу байна.",
    identification_deletion_failed:
      "Та өөрийн сүүлчийн таниулбараа устгах боломжгүй.",
    not_allowed_access: "Хандалтыг зөвшөөрөгдөөгүй",
    organization_domain_blocked: undefined,
    organization_domain_common: undefined,
    organization_membership_quota_exceeded: undefined,
    organization_minimum_permissions_needed: undefined,
    passkey_already_exists: undefined,
    passkey_not_supported: undefined,
    passkey_pa_not_supported: undefined,
    passkey_registration_cancelled: undefined,
    passkey_retrieval_cancelled: undefined,
    passwordComplexity: {
      maximumLength: "{{length}} тэмдэгтээс бага",
      minimumLength: "{{length}} буюу түүнээс олон тэмдэгт",
      requireLowercase: "жижиг үсэг",
      requireNumbers: "тоо",
      requireSpecialCharacter: "тусгай тэмдэгт",
      requireUppercase: "том үсэг",
      sentencePrefix: "таны нууц үг агуулсан байх ёстой",
    },
    phone_number_exists: "Энэ утасны дугаарыг авсан. Өөр оролдоно уу.",
    zxcvbn: {
      couldBeStronger:
        "Таны нууц үг ажилладаг, гэхдээ илүү хүчтэй байж болно. Илүү олон тэмдэгт нэмж үзээрэй.",
      goodPassword: "Таны нууц үг шаардлагатай бүх шаардлагыг хангаж байна.",
      notEnough: "Таны нууц үг хангалттай хүчтэй биш байна.",
      suggestions: {
        allUppercase: "Зарим үсгийг томоор бичнэ үү, гэхдээ бүх үсгийг биш.",
        anotherWord: "Түгээмэл үг бага нэмээрэй.",
        associatedYears: "Тантай холбоотой жилүүдээс зайлсхий.",
        capitalization: "Эхнийхээс бусад үсгийг томоор бичнэ үү.",
        dates: "Тантай холбоотой огноо, жилээс зайлсхий.",
        l33t: "'a'-д '@' гэх мэт урьдчилан таамаглах боломжтой үсгийг орлуулахаас зайлсхий.",
        longerKeyboardPattern:
          "Илүү урт гарын хээ ашиглаж, бичих чиглэлээ олон удаа өөрчил.",
        noNeed:
          "Та тэмдэг, тоо, том үсэг ашиглахгүйгээр хүчтэй нууц үг үүсгэж болно.",
        pwned:
          "Хэрэв та энэ нууц үгийг өөр газар ашигласан бол өөрчлөх хэрэгтэй.",
        recentYears: "Сүүлийн жилүүдээс зайлсхий.",
        repeated: "Дахин давтагдах үг, тэмдэгтээс зайлсхий.",
        reverseWords: "Нийтлэг үгсийг урвуу бичихээс зайлсхий.",
        sequences: "Нийтлэг тэмдэгтүүдийн дарааллаас зайлсхий.",
        useWords: "Олон үг хэрэглээрэй, гэхдээ нийтлэг хэллэгээс зайлсхий.",
      },
      warnings: {
        common: "Энэ бол түгээмэл хэрэглэгддэг нууц үг юм.",
        commonNames: "Нийтлэг нэр, овгийг таахад хялбар байдаг.",
        dates: "Огноог таахад хялбар байдаг.",
        extendedRepeat:
          '"abcabcabc" гэх мэт давтагдах дүрийн хэв маягийг таахад хялбар байдаг.',
        keyPattern: "Богино нууц үгийг таахад хялбар байдаг.",
        namesByThemselves: "Ганц нэр эсвэл овог нэрийг таахад хялбар байдаг.",
        pwned: "Таны нууц үг интернет дэх мэдээллийн зөрчлийн улмаас илэрсэн.",
        recentYears: "Сүүлийн жилүүдийг таахад амархан.",
        sequences: '"ABC" шиг нийтлэг тэмдэгтүүд нь таахад хялбар байдаг.',
        similarToCommon: "Энэ нь түгээмэл хэрэглэгддэг нууц үгтэй төстэй юм.",
        simpleRepeat:
          '"aаа" гэх мэт давтагдсан тэмдэгтүүдийг таахад хялбар байдаг.',
        straightRow:
          "Таны гар дээрх зэрэгцээ товчлууруудыг таахад хялбар байдаг.",
        topHundred: "Энэ бол байнга хэрэглэгддэг нууц үг юм.",
        topTen: "Энэ бол маш их ашиглагддаг нууц үг юм.",
        userInputs: "Хувийн болон хуудастай холбоотой мэдээлэл байх ёсгүй.",
        wordByItself: "Ганц үгийг таахад хялбар байдаг.",
      },
    },
  },
  userButton: {
    action__addAccount: "Бүртгэл нэмэх",
    action__manageAccount: "Бүртгэлийг удирдах",
    action__signOut: "Гарах",
    action__signOutAll: "Бүх бүртгэлээс гарна уу",
  },
  userProfile: {
    backupCodePage: {
      actionLabel__copied: "Хуулсан!",
      actionLabel__copy: "Бүгдийг хуулах",
      actionLabel__download: "Татах .txt",
      actionLabel__print: "Хэвлэх",
      infoText1: "Энэ бүртгэлд нөөц кодуудыг идэвхжүүлэх",
      infoText2:
        "Нөөц кодыг нууцалж, найдвартай хадгална уу. Хэрэв та нөөц кодыг эвдэрсэн гэж сэжиглэж байгаа бол тэдгээрийг дахин үүсгэж болно.",
      subtitle__codelist: "Тэдгээрийг найдвартай хадгалж, нууцаар хадгал.",
      successMessage:
        "Нөөц кодуудыг одоо идэвхжүүлсэн. Хэрэв та баталгаажуулах төхөөрөмждөө хандах эрхээ алдсан тохиолдолд эдгээрийн аль нэгийг ашиглан бүртгэлдээ нэвтэрч болно. Код бүрийг зөвхөн нэг удаа ашиглах боломжтой.",
      successSubtitle:
        "Хэрэв та баталгаажуулах төхөөрөмждөө хандах эрхээ алдсан тохиолдолд эдгээрийн аль нэгийг ашиглан бүртгэлдээ нэвтэрч болно.",
      title: "Нөөц кодын баталгаажуулалтыг нэмэх",
      title__codelist: "Нөөц кодууд",
    },
    connectedAccountPage: {
      formHint: "Бүртгэлээ холбох үйлчилгээ үзүүлэгчээ сонгоно уу.",
      formHint__noAccounts:
        "Боломжтой гадны бүртгэлийн үйлчилгээ үзүүлэгч байхгүй байна.",
      removeResource: {
        messageLine1: "{{identifier}} энэ бүртгэлээс хасагдана.",
        messageLine2:
          "Та цаашид энэ холбогдсон акаунтыг ашиглах боломжгүй бөгөөд хамааралтай функцүүд ажиллахаа болино.",
        successMessage: "{{connectedAccount}} таны бүртгэлээс хасагдсан.",
        title: "Холбогдсон бүртгэлийг устгана уу",
      },
      socialButtonsBlockButton: "{{provider|titleize}}",
      successMessage: "Үйлчилгээ үзүүлэгч таны дансанд нэмэгдсэн байна",
      title: "Холбогдсон бүртгэл нэмэх",
    },
    deletePage: {
      actionDescription: 'Үргэлжлүүлэхийн тулд "Delete account" гэж бичнэ үү.',
      confirm: "Бүртгэл устгах",
      messageLine1: "Та бүртгэлээ устгахдаа итгэлтэй байна уу?",
      messageLine2: "Энэ үйлдэл нь байнгын бөгөөд эргэлт буцалтгүй юм.",
      title: "Бүртгэл устгах",
    },
    emailAddressPage: {
      emailCode: {
        formHint:
          "Баталгаажуулах код агуулсан имэйлийг энэ имэйл хаяг руу илгээх болно.",
        formSubtitle: "{{identifier}} руу илгээсэн баталгаажуулах кодыг илгээх",
        formTitle: "Verification code",
        resendButton: "Код хүлээж аваагүй юу? Дахин илгээх",
        successMessage: "Таны бүртгэлд {{identifier}} имэйл нэмэгдлээ.",
      },
      emailLink: {
        formHint:
          "Баталгаажуулах холбоос бүхий имэйлийг энэ имэйл хаяг руу илгээх болно.",
        formSubtitle:
          "{{identifier}}руу илгээсэн имэйл дэх баталгаажуулах холбоос дээр дарна уу.",
        formTitle: "Баталгаажуулах холбоос",
        resendButton: "Холбоос хүлээж аваагүй юу? Дахин илгээх",
        successMessage: "Таны бүртгэлд {{identifier}} имэйл нэмэгдлээ.",
      },
      removeResource: {
        messageLine1: "{{identifier}} энэ бүртгэлээс хасагдана.",
        messageLine2:
          "Та цаашид энэ имэйл хаягийг ашиглан нэвтрэх боломжгүй болно.",
        successMessage: "{{emailAddress}} таны бүртгэлээс хасагдсан.",
        title: "Имэйл хаягийг устгана уу",
      },
      title: "Имэйл хаяг нэмэх",
      verifyTitle: "Имэйл хаягийг баталгаажуулах",
    },
    formButtonPrimary__add: "Нэмэх",
    formButtonPrimary__continue: "Үргэлжлүүлэх",
    formButtonPrimary__finish: "Дуусгах",
    formButtonPrimary__remove: "Устгах",
    formButtonPrimary__save: "Хадгалах",
    formButtonReset: "Цуцлах",
    mfaPage: {
      formHint: "Нэмэх аргыг сонгоно уу.",
      title: "Two-step баталгаажуулалт нэмэх",
    },
    mfaPhoneCodePage: {
      backButton: "Одоо байгаа дугаарыг ашиглах",
      primaryButton__addPhoneNumber: "Утасны дугаар нэмэх",
      removeResource: {
        messageLine1:
          "{{identifier}} нэвтрэх үед баталгаажуулах код хүлээн авахгүй.",
        messageLine2:
          "Таны бүртгэл тийм ч аюулгүй биш байж магадгүй. Та үргэлжлүүлэхдээ итгэлтэй байна уу?",
        successMessage:
          "SMS код Two-step баталгаажуулалтыг {{mfaPhoneCode}}-д устгасан.",
        title: "Two-step баталгаажуулалтыг устгах",
      },
      subtitle__availablePhoneNumbers:
        "SMS код хоёр шаттай баталгаажуулалтад бүртгүүлэх эсвэл шинээр нэмэхийн тулд одоо байгаа утасны дугаараа сонгоно уу.",
      subtitle__unavailablePhoneNumbers:
        "SMS код хоёр шаттай баталгаажуулалтад бүртгүүлэх утасны дугаар байхгүй тул шинээр нэмнэ үү.",
      successMessage1:
        "Нэвтрэхдээ нэмэлт алхам болгон энэ утасны дугаар руу илгээсэн баталгаажуулах кодыг оруулах шаардлагатай.",
      successMessage2:
        "Эдгээр нөөц кодыг хадгалж, аюулгүй газар хадгална уу. Хэрэв та баталгаажуулах төхөөрөмждөө хандах эрхээ алдвал нөөц код ашиглан нэвтрэх боломжтой.",
      successTitle: "SMS код баталгаажуулалтыг идэвхжүүлсэн",
      title: "SMS код баталгаажуулалтыг нэмэх",
    },
    mfaTOTPPage: {
      authenticatorApp: {
        buttonAbleToScan__nonPrimary: "QR кодыг уншина уу",
        buttonUnableToScan__nonPrimary: "QR кодыг скан хийж чадахгүй байна уу?",
        infoText__ableToScan:
          "Authenticator програмдаа нэвтрэх шинэ аргыг тохируулаад дараах QR кодыг скан хийж өөрийн бүртгэлтэй холбоно уу.",
        infoText__unableToScan:
          "Authenticator програмдаа нэвтрэх шинэ аргыг тохируулаад доор өгсөн Key оруулна уу",
        inputLabel__unableToScan1:
          "Цаг дээр суурилсан эсвэл Нэг удаагийн нууц үг идэвхжсэн эсэхийг шалгаад бүртгэлээ холбож дуусгана уу.",
        inputLabel__unableToScan2:
          "Эсвэл, хэрэв таны баталгаажуулагч TOTP URI-г дэмждэг бол та бүрэн URI-г хуулж болно.",
      },
      removeResource: {
        messageLine1:
          "Нэвтрэх үед энэ баталгаажуулагчийн баталгаажуулах код шаардлагагүй болно.",
        messageLine2:
          "Таны бүртгэл тийм ч аюулгүй биш байж магадгүй. Та үргэлжлүүлэхдээ итгэлтэй байна уу?",
        successMessage:
          "Authenticator програмаар дамжуулан хоёр шаттай баталгаажуулалтыг устгасан.",
        title: "Two-step баталгаажуулалтыг устгах",
      },
      successMessage:
        "Two-step баталгаажуулалтыг одоо идэвхжүүлсэн. Нэвтрэх үед та нэмэлт алхам болгон энэ баталгаажуулагчаас баталгаажуулах код оруулах шаардлагатай болно.",
      title: "Authenticator програм нэмэх",
      verifySubtitle: "Authenticator-н үүсгэсэн баталгаажуулах кодыг оруулах",
      verifyTitle: "Баталгаажуулах код",
    },
    mobileButton__menu: "Цэс",
    navbar: {
      account: "Профайл",
      description: "Бүртгэлийнхээ мэдээллийг удирдана уу.",
      security: "Аюулгүй байдал",
      title: "Бүртгэл",
    },
    passkeyScreen: {
      removeResource: {
        messageLine1: undefined,
        title: undefined,
      },
      subtitle__rename: undefined,
      title__rename: undefined,
    },
    passwordPage: {
      checkboxInfoText__signOutOfOtherSessions:
        "Таны хуучин нууц үгийг ашигласан бусад бүх төхөөрөмжөөс гарахыг зөвлөж байна.",
      readonly:
        "Та зөвхөн байгууллагын холболтоор нэвтрэх боломжтой тул таны нууц үгийг одоогоор засах боломжгүй.",
      successMessage__set: "Таны нууц үгийг тохирууллаа.",
      successMessage__signOutOfOtherSessions: "Бусад бүх төхөөрөмжөөс гарсан.",
      successMessage__update: "Таны нууц үг шинэчлэгдсэн.",
      title__set: "Нууц үг тохируулах",
      title__update: "Нууц үгийг шинэчлэх",
    },
    phoneNumberPage: {
      infoText:
        "Баталгаажуулах код агуулсан мессежийг энэ утасны дугаар руу илгээх болно. Мессеж болон дата төлбөр гарч болзошгүй.",
      removeResource: {
        messageLine1: "{{identifier}} энэ бүртгэлээс хасагдана.",
        messageLine2:
          "Та цаашид энэ утасны дугаарыг ашиглан нэвтрэх боломжгүй болно.",
        successMessage: "{{phoneNumber}} таны бүртгэлээс хасагдсан.",
        title: "Утасны дугаарыг устгах",
      },
      successMessage: "{{identifier}} таны бүртгэлд нэмэгдсэн.",
      title: "Утасны дугаар нэмэх",
      verifySubtitle:
        "{{identifier}} руу илгээсэн баталгаажуулах кодыг оруулна уу",
      verifyTitle: "Утасны дугаарыг баталгаажуулах",
    },
    profilePage: {
      fileDropAreaHint: "Санал болгож буй хэмжээ 1:1, 10MB хүртэл.",
      imageFormDestructiveActionSubtitle: "Устгах",
      imageFormSubtitle: "Upload",
      imageFormTitle: "Профайлын зураг",
      readonly:
        "Таны профайлын мэдээллийг байгууллагын холболтоор өгсөн тул засварлах боломжгүй.",
      successMessage: "Таны профайл шинэчлэгдсэн.",
      title: "Профайлыг шинэчлэх",
    },
    start: {
      activeDevicesSection: {
        destructiveAction: "Төхөөрөмжөөс гарах",
        title: "Идэвхтэй төхөөрөмжүүд",
      },
      connectedAccountsSection: {
        actionLabel__connectionFailed: "Дахин оролд",
        actionLabel__reauthorize: "Зөвшөөрөх",
        destructiveActionTitle: "Устгах",
        primaryButton: "Бүртгэлийг холбоно уу",
        subtitle__disconnected: undefined,
        subtitle__reauthorize:
          "Шаардлагатай хамрах хүрээг шинэчилсэн бөгөөд танд хязгаарлагдмал ажиллагаатай байж магадгүй. Асуудлаас зайлсхийхийн тулд энэ аппликешныг дахин зөвшөөрнө үү",
        title: "Холбогдсон бүртгэлүүд",
      },
      dangerSection: {
        deleteAccountButton: "Бүртгэл устгах",
        title: "Бүртгэл устгах",
      },
      emailAddressesSection: {
        destructiveAction: "Имэйлийг устгах",
        detailsAction__nonPrimary: "Үндсэн болгож тохируулах",
        detailsAction__primary: "Бүрэн баталгаажуулалт",
        detailsAction__unverified: "Баталгаажуулах",
        primaryButton: "Имэйл хаяг нэмэх",
        title: "Имэйл хаягууд",
      },
      enterpriseAccountsSection: {
        title: "Байгууллагын бүртгэлүүд",
      },
      headerTitle__account: "Профайлын дэлгэрэнгүй",
      headerTitle__security: "Аюулгүй байдал",
      mfaSection: {
        backupCodes: {
          actionLabel__regenerate: "Дахин үүсгэх",
          headerTitle: "Нөөц кодууд",
          subtitle__regenerate:
            "Аюулгүй нөөц кодуудын шинэ багц аваарай. Өмнөх нөөц кодыг устгах бөгөөд ашиглах боломжгүй.",
          title__regenerate: "Нөөц кодуудыг дахин үүсгэх",
        },
        phoneCode: {
          actionLabel__setDefault: "Өгөгдмөл болгож тохируулах",
          destructiveActionLabel: "Устгах",
        },
        primaryButton: "Two-step баталгаажуулалт нэмэх",
        title: "Two-step баталгаажуулалт",
        totp: {
          destructiveActionTitle: "Устгах",
          headerTitle: "Authenticator програм",
        },
      },
      passkeysSection: {
        menuAction__destructive: undefined,
        menuAction__rename: undefined,
        title: undefined,
      },
      passwordSection: {
        primaryButton__setPassword: "Нууц үг тохируулах",
        primaryButton__updatePassword: "Нууц үг шинэчлэх",
        title: "Нууц үг",
      },
      phoneNumbersSection: {
        destructiveAction: "Утасны дугаар устгах",
        detailsAction__nonPrimary: "Үндсэн болгох",
        detailsAction__primary: "Бүрэн баталгаажуулалт",
        detailsAction__unverified: "Утасны дугаар баталгаажуулах",
        primaryButton: "Утасны дугаар нэмэх",
        title: "Утасны дугаарууд",
      },
      profileSection: {
        primaryButton: "Профайлыг шинэчлэх",
        title: "Профайл",
      },
      usernameSection: {
        primaryButton__setUsername: "Хэрэглэгчийн нэрийг тохируулах",
        primaryButton__updateUsername: "Хэрэглэгчийн нэрийг шинэчлэх",
        title: "Хэрэглэгчийн нэр",
      },
      web3WalletsSection: {
        destructiveAction: "Wallet устгэх",
        primaryButton: "Web3 wallets",
        title: "Web3 wallets",
      },
    },
    usernamePage: {
      successMessage: "Таны хэрэглэгчийн нэр шинэчлэгдсэн.",
      title__set: "Хэрэглэгчийн нэрийг тохируулах",
      title__update: "эрэглэгчийн нэрийг шинэчлэх",
    },
    web3WalletPage: {
      removeResource: {
        messageLine1: "{{identifier}} энэ бүртгэлээс хасагдана.",
        messageLine2:
          "Та цаашид энэ web3 түрийвчийг ашиглан нэвтрэх боломжгүй болно.",
        successMessage: "{{web3Wallet}} таны бүртгэлээс хасагдсан.",
        title: "Web3 wallet устгах",
      },
      subtitle__availableWallets:
        "Өөрийн бүртгэлтэй холбогдохын тулд web3 wallet-аа сонго.",
      subtitle__unavailableWallets: "Боломжтой web3 wallets алга.",
      successMessage: "Таны бүртгэлд web3 wallet нэмэгдлээ.",
      title: "Web3 wallet нэмэх",
      web3WalletButtonsBlockButton: undefined,
    },
  },
  waitlist: {
    start: {
      actionLink: undefined,
      actionText: undefined,
      formButton: undefined,
      subtitle: undefined,
      title: undefined,
    },
    success: {
      message: undefined,
      subtitle: undefined,
      title: undefined,
    },
  },
} as const;
