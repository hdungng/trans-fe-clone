// comboBox Hai Quan
export function getLabelCustoms(zoneCode: string | null | undefined, value: string | null | undefined) {
  if (!zoneCode || !value) '-';

  const zoneArray = comboBoxCustom[zoneCode as string];
  if (!zoneArray) return '-';

  const item = zoneArray.find((entry: any) => entry.value === value);
  return item ? item.label : null;
}



export const comboBoxCustom: any = {
  "01AC": [
    {
      value: "00",
      label: "00 - HQ Gia Lâm"
    }
  ],
  "01B1": [
    {
      value: "00",
      label: "00 - Tiếp nhận 1: A11,A12,A41,H11"
    },
    {
      value: "01",
      label: "01 - Tiếp nhận 2: Tiếp nhận tờ khai hải quan đối với các loại hình còn lại."
    }
  ],
  "01B3": [
    {
      value: "00",
      label: "00 - HQ Sân bay Nội bài-Đội Nhập"
    }
  ],
  "01B5": [
    {
      value: "00",
      label: "00 - Đội thủ tục hành lý xuất khẩu"
    }
  ],
  "01B6": [
    {
      value: "00",
      label: "00 - Đội thủ tục hành lý nhập khẩu"
    }
  ],
  "01BT": [
    {
      value: "00",
      label: "00 - HQ Yên Bái"
    }
  ],
  "01DD": [
    {
      value: "01",
      label: "01 - Bộ phận kiểm tra tờ khai các đại lý: EMS, Bưu Chính và các loại hình/doanh nghiệp còn lại."
    },
    {
      value: "02",
      label: "02 - Bộ phận kiểm tra tờ khai các đại lý: DHL, UPS, Thần tốc và một số đại lý khai báo khác."
    }
  ],
  "01E1": [
    {
      value: "00",
      label: "00 - Đội nghiệp vụ xử lý đường biển, sắt, bộ, khác."
    },
    {
      value: "01",
      label: "01 - Đội nghiệp vụ xử lý đường hàng không"
    }
  ],
  "01E2": [
    {
      value: "00",
      label: "00 - Đội Hàng không"
    }
  ],
  "01IK": [
    {
      value: "00",
      label: "00 - HQ Gia Thụy"
    },
    {
      value: "01",
      label: "01 - Đội Thủ tục hàng hóa xuất nhập khẩu hàng không"
    }
  ],
  "01M1": [
    {
      value: "00",
      label: "00 - Bộ phận tiếp nhận tờ khai A11, A12, A41, A31, A21, A42, A43, H11"
    },
    {
      value: "01",
      label: "01 - Bộ phận tiếp nhận B11, B12, B13, E42, E52, E54, E62, E82, G21, G22, G23, G24, G61, H21, E11, E13, E15, E21, E23, E31, E41, G12, G13, G14, G51"
    }
  ],
  "01M2": [
    {
      value: "00",
      label: "00 - Đội TTHQ Khu CNC Hòa Lạc"
    }
  ],
  "01NV": [
    {
      value: "00",
      label: "00 - Bộ phận tiếp nhận các loại hình khác C11"
    },
    {
      value: "01",
      label: "01 - Bộ phận tiếp nhận loại hình Kho ngoại quan (C11)"
    }
  ],
  "01PJ": [
    {
      value: "00",
      label: "00 - hải quan Việt Trì"
    }
  ],
  "01PL": [
    {
      value: "00",
      label: "00 - Bộ phận tiếp nhận tờ khai A11, A12, A41, A31, A21, A42, A43, H11"
    },
    {
      value: "01",
      label: "01 - Bộ phận tiếp nhận B11, B12, B13, E42, E52, E54, E62, E82, G21, G22, G23, G24, G61, H21, E11, E13, E15, E21, E23, E31, E41, G12, G13, G14, G51"
    }
  ],
  "01PM": [
    {
      value: "02",
      label: "02 - HQ Hà Tây - Đội NV"
    }
  ],
  "01PO": [
    {
      value: "00",
      label: "00 - HQ Vĩnh Phúc (Thuộc HQ Hà Nội)"
    }
  ],
  "01PQ": [
    {
      value: "00",
      label: "00 - Hải quan Hòa Bình"
    }
  ],
  "01PR": [
    {
      value: "00",
      label: "00 - HQ Vĩnh Phúc"
    }
  ],
  "01PV": [
    {
      value: "00",
      label: "00 - Hải quan Việt Trì"
    }
  ],
  "01SI": [
    {
      value: "00",
      label: "00 - HQ Ga đường sắt quốc tế Yên Viên"
    }
  ],
  "01TE": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ"
    },
    {
      value: "02",
      label: "02 - Đội Hàng không"
    },
    {
      value: "03",
      label: "03 - Đội Thủ tục chuyển phát nhanh"
    }
  ],
  "01ZZ": [
    {
      value: "00",
      label: "00 - Hải quan TP Hà Nội"
    }
  ],
  "02B1": [
    {
      value: "00",
      label: "00 - Bộ phận hàng hóa Nhập khẩu hàng mậu dịch kho TCS"
    },
    {
      value: "01",
      label: "01 - Bộ phận hàng hóa Nhập khẩu hàng mậu dịch kho SCSC"
    },
    {
      value: "02",
      label: "02 - Bộ phận hàng hóa Nhập khẩu hàng phi mậu dịch, tạm nhập, tái xuất."
    },
    {
      value: "03",
      label: "03 - Bộ phận hàng hóa ngoài giờ."
    },
    {
      value: "04",
      label: "04 - Bộ phận hàng hóa Xuất khẩu kho TCS."
    },
    {
      value: "05",
      label: "05 - Bộ phận hàng hóa Xuất khẩu kho SCSC."
    }
  ],
  "02B4": [
    {
      value: "00",
      label: "00 - Đội Thủ tục hàng hóa XNK - SCSC - HQ Sân bay quốc tế Tân Sơn Nhất"
    }
  ],
  "02CC": [
    {
      value: "01",
      label: "01 - Đội thủ tục hàng hóa XNK"
    },
    {
      value: "02",
      label: "02 - Đội Giám sát"
    }
  ],
  "02CH": [
    {
      value: "01",
      label: "01 - HQ CK Cảng Sài Gòn KV III"
    }
  ],
  "02CI": [
    {
      value: "00",
      label: "00 - Bộ phận giám sát"
    },
    {
      value: "01",
      label: "01 - Bộ phận hàng hóa Xuất khẩu"
    },
    {
      value: "02",
      label: "02 - Bộ phận hàng hóa Nhập khẩu"
    },
    {
      value: "03",
      label: "03 - Bộ phận hàng hóa Nhập khẩu (thực hiện thủ tục ngoài giờ hành chính)"
    }
  ],
  "02CV": [
    {
      value: "01",
      label: "01 - Bộ phận Thủ tục hàng hóa XNK Cảng Tân cảng Hiệp Phước"
    },
    {
      value: "02",
      label: "02 - Bộ phận Thủ tục hàng hóa XNK Cảng SPCT"
    },
    {
      value: "03",
      label: "03 - Bộ phận Thủ tục hàng hóa XNK Cảng Sài gòn Hiệp Phước; hàng hóa Tạm nhập-Tái xuất, Tái xuất-Tạm nhập"
    },
    {
      value: "04",
      label: "04 - Bộ phận Thủ tục hàng hóa XNK doanh nghiệp chế xuất; Gia công; Sản xuất xuất khẩu"
    },
    {
      value: "05",
      label: "05 - Bộ phận làm Thủ tục Hải quan cho Kho ngoại quan"
    }
  ],
  "02CX": [
    {
      value: "00",
      label: "00 - Đội Thủ tục hàng hóa XNK"
    }
  ],
  "02DS": [
    {
      value: "00",
      label: "00 - Bộ phận thủ tục hàng Bưu chính (270 Lý Thường Kiệt)"
    },
    {
      value: "01",
      label: "01 - Bộ phận thủ tục hàng kinh doanh (Mậu dịch)"
    },
    {
      value: "02",
      label: "02 - Bộ phận thủ tục hàng phi mậu dịch (DHL, Hợp nhất, Vantage, Thái Sơn)"
    },
    {
      value: "03",
      label: "03 - Bộ phận thủ tục hàng Bưu chính (EMS – 36 Bis Ba Vì)"
    },
    {
      value: "04",
      label: "04 - Bộ phận thủ tục hàng phi mậu dịch (Fedex)"
    },
    {
      value: "05",
      label: "05 - Bộ phận thủ tục hàng phi mậu dịch (UPS, Sagawa, SCE, Vietlink)"
    }
  ],
  "02F1": [
    {
      value: "00",
      label: "00 - Bộ phận nghiệp vụ 1 (Linh Trung 1)"
    },
    {
      value: "01",
      label: "01 - Bộ phận Giám sát"
    }
  ],
  "02F2": [
    {
      value: "00",
      label: "00 - Bộ phận nghiệp vụ 2 ( Linh Trung 2)"
    }
  ],
  "02F3": [
    {
      value: "00",
      label: "00 - Bộ phận thủ tục HQ đối với hàng hóa XNK tại Khu công nghệ cao"
    },
    {
      value: "01",
      label: "01 - Bộ phận Giám sát tại Khu công nghệ cao"
    },
    {
      value: "02",
      label: "02 - Bộ phận Nghiệp vụ đầu tư kinh doanh"
    },
    {
      value: "03",
      label: "03 - Bộ phận Nghiệp vụ SXXK"
    }
  ],
  "02H1": [
    {
      value: "00",
      label: "00 - Bộ phận hàng hóa XNK cảng Bến Nghé, Tân Thuận 1 và 2, Tân thuận Đông Lotus, các phao thuộc địa bàn"
    },
    {
      value: "01",
      label: "01 - Bộ phận hàng hóa XNK cảng Khánh Hội Nhà rồng"
    },
    {
      value: "02",
      label: "02 - Loại hình C11 KNQ Cty CP Cảng SG"
    },
    {
      value: "03",
      label: "03 - Loại hình C11 KNQ Lotus"
    }
  ],
  "02H2": [
    {
      value: "00",
      label: "00 - Bộ phận thủ tục và giám sát Xăng dầu (Kho xăng dầu)"
    }
  ],
  "02H3": [
    {
      value: "00",
      label: "00 - Bộ phận thủ tục hàng hóa XNK 2 (cảng VICT)"
    }
  ],
  "02IK": [
    {
      value: "01",
      label: "01 - Bộ phận thủ tục hàng hóa nhập khẩu"
    },
    {
      value: "02",
      label: "02 - Bộ phận thủ tục hàng hóa xuất khẩu"
    }
  ],
  "02PG": [
    {
      value: "00",
      label: "00 - Hàng sản xuất xuất khẩu của các Doanh nghiệp có kim ngạch lớn"
    },
    {
      value: "01",
      label: "01 - Nhóm 01: hàng đầu tư kinh doanh nhóm 1 + hàng xuất khẩu"
    },
    {
      value: "02",
      label: "02 - Nhóm 02: hàng gia công, sản xuất xuất khẩu của các doanh nghiệp còn lại"
    },
    {
      value: "03",
      label: "03 - Nhóm 03: hàng đầu tư KD nhóm 3 + doanh nghiệp ưu tiên"
    },
    {
      value: "04",
      label: "04 - Nhóm 04: hàng đầu tư KD nhóm 4 + hàng hóa TNTX, TXTN"
    },
    {
      value: "05",
      label: "05 - Nhóm 05: hàng đầu tư kinh doanh nhóm 5 + Doanh nghiệp tham gia chương trình ưu đãi thuế quan"
    }
  ],
  "02PJ": [
    {
      value: "01",
      label: "01 - Bộ phận thủ tục hàng gia công"
    },
    {
      value: "02",
      label: "02 - Bộ phận thủ tục hàng sản xuất xuất khẩu"
    },
    {
      value: "03",
      label: "03 - Bộ phận thủ tục hàng gia công (Nhóm Báo cáo quyết toán)."
    }
  ],
  "02XE": [
    {
      value: "00",
      label: "00 - Bộ phận thủ tục hàng hóa XNK Khu chế xuất Tân Thuận."
    },
    {
      value: "01",
      label: "01 - Bộ phận thủ tục hàng gia công"
    },
    {
      value: "02",
      label: "02 - Bộ phận thủ tục hàng sản xuất xuất khẩu"
    },
    {
      value: "03",
      label: "03 - Bộ phận thủ tục hàng gia công (Nhóm Báo cáo quyết toán)"
    },
    {
      value: "04",
      label: "04 - Bộ phận thủ tục hàng hóa gia công Khu chế xuất Tân Thuận"
    },
    {
      value: "05",
      label: "05 - Bộ phận thủ tục hàng hóa kho ngoại quan"
    }
  ],
  "02ZZ": [
    {
      value: "00",
      label: "00 - Hải quan TP Hồ Chí Minh"
    }
  ],
  "03CC": [
    {
      value: "00",
      label: "00 - Bộ phận tiếp nhận tờ khai XNK"
    },
    {
      value: "01",
      label: "01 - Bộ phận tiếp nhận tờ khai C11"
    }
  ],
  "03CD": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ"
    }
  ],
  "03CE": [
    {
      value: "00",
      label: "00 - Bộ phận tiếp nhận tờ khai XNK"
    },
    {
      value: "01",
      label: "01 - Bộ phận tiếp nhận tờ khai C11"
    }
  ],
  "03EE": [
    {
      value: "00",
      label: "00 - Bộ phận tiếp nhận tờ khai XNK"
    },
    {
      value: "01",
      label: "01 - Bộ phận tiếp nhận tờ khai C11"
    }
  ],
  "03NK": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ"
    }
  ],
  "03PA": [
    {
      value: "00",
      label: "00 - Đội thủ tục hàng Gia công"
    },
    {
      value: "01",
      label: "01 - Đội thủ tục hàng đầu tư"
    }
  ],
  "03PJ": [
    {
      value: "00",
      label: "00 - HQ Hải dương"
    }
  ],
  "03PL": [
    {
      value: "00",
      label: "00 - HQ Hưng yên"
    }
  ],
  "03TG": [
    {
      value: "00",
      label: "00 - Bộ phận tiếp nhận tờ khai XNK"
    },
    {
      value: "01",
      label: "01 - Bộ phận tiếp nhận tờ khai C11"
    }
  ],
  "03ZZ": [
    {
      value: "00",
      label: "00 - Hải quan TP Hải Phòng"
    }
  ],
  "10BB": [
    {
      value: "00",
      label: "00 - HQ CK Thanh Thủy Hà Giang"
    }
  ],
  "10BC": [
    {
      value: "00",
      label: "00 - HQ CK Xín Mần Hà Giang"
    }
  ],
  "10BD": [
    {
      value: "00",
      label: "00 - HQ CK Phó Bảng Hà Giang"
    }
  ],
  "10BF": [
    {
      value: "00",
      label: "00 - HQ CK Săm Pun"
    }
  ],
  "10BI": [
    {
      value: "00",
      label: "00 - HQ Tuyên Quang"
    }
  ],
  "10ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Hà Giang"
    }
  ],
  "11B1": [
    {
      value: "00",
      label: "00 - HQ CK Tà Lùng"
    }
  ],
  "11B2": [
    {
      value: "00",
      label: "00 - Đội NV số 2 Nà Lạn"
    }
  ],
  "11BB": [
    {
      value: "01",
      label: "01 - Đội NV số 2 Nà Lạn"
    }
  ],
  "11BE": [
    {
      value: "00",
      label: "00 - HQ CK Trà Lĩnh"
    }
  ],
  "11BF": [
    {
      value: "00",
      label: "00 - HQ CK Sóc Giang"
    }
  ],
  "11BH": [
    {
      value: "00",
      label: "00 - HQ CK Pò Peo"
    }
  ],
  "11G1": [
    {
      value: "00",
      label: "00 - HQ CK Bí Hà"
    }
  ],
  "11G2": [
    {
      value: "00",
      label: "00 - Đội NV Lý Vạn - HQCK Bí Hà"
    }
  ],
  "11PK": [
    {
      value: "00",
      label: "00 - HQ Bắc Kạn"
    }
  ],
  "11ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Cao Bằng"
    }
  ],
  "12B2": [
    {
      value: "00",
      label: "00 - Đội Thủ tục Huổi Puốc -  HQ CK Tây Trang Điện Biên"
    }
  ],
  "12BB": [
    {
      value: "01",
      label: "01 - Đội Thủ tục Huổi Puốc"
    }
  ],
  "12BE": [
    {
      value: "00",
      label: "00 - HQ CK Lóng Sập"
    }
  ],
  "12BH": [
    {
      value: "00",
      label: "00 - HQ CK Ma Lu Thàng"
    },
    {
      value: "01",
      label: "01 - Đội Hải quan Pô Tô"
    }
  ],
  "12BI": [
    {
      value: "00",
      label: "00 - HQ CK Chiềng Khương"
    }
  ],
  "12F1": [
    {
      value: "00",
      label: "00 - HQ Thị xã Sơn La - Điện Biên"
    }
  ],
  "12F2": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ HQCK Nà Cài"
    }
  ],
  "12H1": [
    {
      value: "00",
      label: "00 - Đội Nghiệp Vụ - HQ CK Ma Lu Thàng"
    }
  ],
  "12H2": [
    {
      value: "00",
      label: "00 - Đội Hải quan Pô Tô"
    }
  ],
  "12ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Điện Biên"
    }
  ],
  "13BB": [
    {
      value: "00",
      label: "00 - Đội Thủ tục HH XNK 1"
    },
    {
      value: "01",
      label: "01 - Đội Thủ tục HH XNK 2"
    }
  ],
  "13BC": [
    {
      value: "00",
      label: "00 - HQ CK Mường Khương"
    }
  ],
  "13BD": [
    {
      value: "00",
      label: "00 - HQ CK Bát Xát"
    }
  ],
  "13G1": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ-Ga Đường Sắt LC"
    },
    {
      value: "01",
      label: "01 - Đội Nghiệp vụ các Khu công nghiệp Lào Cai"
    }
  ],
  "13G2": [
    {
      value: "00",
      label: "00 - ICD Vinalines-Ga Đường Sắt LC"
    }
  ],
  "13SG": [
    {
      value: "01",
      label: "01 - HQ Đường sắt LVQT Lào Cai"
    }
  ],
  "13ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Lào Cai"
    }
  ],
  "15B3": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ Pò Nhùng"
    }
  ],
  "15BB": [
    {
      value: "00",
      label: "00 - Đội thủ tục hàng hóa xuất khẩu"
    },
    {
      value: "01",
      label: "01 - Đội thủ tục chuyển phát nhanh - bưu chính"
    },
    {
      value: "02",
      label: "02 - Đội nghiệp vụ Pò Nhùng"
    }
  ],
  "15BC": [
    {
      value: "00",
      label: "00 - HQ CK Chi Ma Lạng Sơn"
    }
  ],
  "15BD": [
    {
      value: "00",
      label: "00 - HQ Cốc Nam"
    }
  ],
  "15BE": [
    {
      value: "00",
      label: "00 - Thông quan bộ phận 00"
    },
    {
      value: "01",
      label: "01 - Đội nghiệp vụ Na Hình"
    },
    {
      value: "02",
      label: "02 - Đội nghiệp vụ Nà Nưa"
    },
    {
      value: "03",
      label: "03 - Đội nghiệp vụ Bình Nghi"
    }
  ],
  "15SI": [
    {
      value: "00",
      label: "00 - HQ Ga Đồng Đăng"
    }
  ],
  "15ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Lạng Sơn"
    }
  ],
  "18A1": [
    {
      value: "00",
      label: "00 - Đội TTQH quản lý KCN Yên Phong"
    }
  ],
  "18A2": [
    {
      value: "00",
      label: "00 - Đội TTQH quản lý KCN Quế Võ"
    }
  ],
  "18A3": [
    {
      value: "00",
      label: "00 - Bộ phận tiếp nhận 00"
    },
    {
      value: "01",
      label: "01 - Bộ phận tiếp nhận 01"
    }
  ],
  "18B1": [
    {
      value: "00",
      label: "00 - Bộ phận tiếp nhận 00"
    },
    {
      value: "01",
      label: "01 - Bộ phận tiếp nhận 01"
    }
  ],
  "18B2": [
    {
      value: "00",
      label: "00 - Đội Thủ tục KCN Yên Bình"
    }
  ],
  "18BC": [
    {
      value: "00",
      label: "00 - Bộ phận tiếp nhận 00"
    },
    {
      value: "01",
      label: "01 - Bộ phận tiếp nhận 01"
    },
    {
      value: "02",
      label: "02 - HQ QL các KCN Bắc Giang - Đội tổng hợp"
    }
  ],
  "18BE": [
    {
      value: "00",
      label: "00 - Đội nghiệp vụ Yên Phong"
    }
  ],
  "18ID": [
    {
      value: "00",
      label: "00 - Bộ phận tiếp nhận 00"
    },
    {
      value: "01",
      label: "01 - Bộ phận tiếp nhận 01"
    }
  ],
  "18ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Bắc Ninh"
    }
  ],
  "20BB": [
    {
      value: "00",
      label: "00 - Đội nghiệp vụ"
    }
  ],
  "20BC": [
    {
      value: "00",
      label: "00 - HQ CK Hoành Mô"
    }
  ],
  "20BD": [
    {
      value: "00",
      label: "00 - HQ Bắc Phong Sinh Quảng Ninh"
    }
  ],
  "20CD": [
    {
      value: "00",
      label: "00 - HQ Cảng Biển Cái Lân"
    }
  ],
  "20CE": [
    {
      value: "00",
      label: "00 - HQ Vạn Gia"
    }
  ],
  "20CF": [
    {
      value: "00",
      label: "00 - HQ CK Cảng Hòn Gai"
    }
  ],
  "20CG": [
    {
      value: "00",
      label: "00 - HQ CK Cảng Cẩm Phả"
    }
  ],
  "20ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Quảng Ninh"
    }
  ],
  "27B1": [
    {
      value: "00",
      label: "00 - HQ CK Na Mèo Thanh Hoá"
    }
  ],
  "27B2": [
    {
      value: "00",
      label: "00 - Đội thủ tục Hải quan CK Tén Tằn"
    }
  ],
  "27CF": [
    {
      value: "01",
      label: "01 - Đội TTHQ cảng Nghi Sơn"
    }
  ],
  "27F1": [
    {
      value: "00",
      label: "00 - Đội thủ tục-HQ Cảng Thanh Hóa"
    }
  ],
  "27F2": [
    {
      value: "00",
      label: "00 - Đội thủ tục HQ Cảng Nghi Sơn"
    }
  ],
  "27NJ": [
    {
      value: "00",
      label: "00 - HQ Quản lý các KCN Hà Nam"
    }
  ],
  "27PC": [
    {
      value: "00",
      label: "00 - Đội nghiệp vụ - HQ Ninh Bình"
    },
    {
      value: "01",
      label: "01 - Đội HQ Hà Nam (thuộc HQ Ninh Bình)"
    },
    {
      value: "02",
      label: "02 - HQ cảng Ninh Phúc - HQ Ninh Bình"
    },
    {
      value: "03",
      label: "03 - HQ Kho ngoại quan (thuộc HQ Ninh Bình)"
    },
    {
      value: "04",
      label: "04 - HQ Ninh Bình - Đội NV"
    }
  ],
  "27PE": [
    {
      value: "00",
      label: "00 - HQ Nam Định"
    }
  ],
  "27ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Thanh Hoá"
    }
  ],
  "28NJ": [
    {
      value: "00",
      label: "00 - HQ KCN tỉnh Hà Nam"
    }
  ],
  "28PC": [
    {
      value: "00",
      label: "00 - Đội nghiệp vụ - HQ Ninh Bình"
    },
    {
      value: "02",
      label: "02 - Đội nghiệp vụ hải quan cảng Ninh Phúc - HQ Ninh Bình"
    }
  ],
  "28PE": [
    {
      value: "00",
      label: "00 - HQ Nam Định"
    }
  ],
  "29BB": [
    {
      value: "00",
      label: "00 - HQ CK Quốc tế Nậm Cắn"
    }
  ],
  "29C1": [
    {
      value: "00",
      label: "00 - Đội thủ tục - HQ Cảng Nghệ An"
    }
  ],
  "29CC": [
    {
      value: "00",
      label: "00 - HQ CK Cảng"
    }
  ],
  "29PF": [
    {
      value: "00",
      label: "00 - Bộ phận tiếp nhận A11, A12, A21, A31, A41, A42, A43, H11, H21"
    },
    {
      value: "01",
      label: "01 - Bộ phận tiếp nhận B11, B12, B13"
    },
    {
      value: "02",
      label: "02 - Bộ phận tiếp nhận E31, E62, E11, E15, E13, E42, E21, E52, E54, E41, E82, G11, G21, G12, G22, G13, G23, G14, G24, G51, G61"
    }
  ],
  "29ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Nghệ An"
    }
  ],
  "30BB": [
    {
      value: "00",
      label: "00 - Bộ phận tiếp nhận A11, A12, A31, G51, G11, E21, H11"
    },
    {
      value: "01",
      label: "01 - Bộ phận tiếp nhận B11, B12, G61, G21, G23, E52, E54, E62, H21"
    }
  ],
  "30BE": [
    {
      value: "00",
      label: "00 - HQ Hồng Lĩnh"
    }
  ],
  "30BI": [
    {
      value: "00",
      label: "00 - HQ khu kinh tế CK Cầu Treo"
    }
  ],
  "30CC": [
    {
      value: "00",
      label: "00 - HQ CK Cảng Xuân Hải"
    }
  ],
  "30F1": [
    {
      value: "00",
      label: "00 - HQ CK Cảng Vũng Áng"
    }
  ],
  "30F2": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ cảng Sơn Dương"
    }
  ],
  "30ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Hà Tĩnh"
    }
  ],
  "31BB": [
    {
      value: "00",
      label: "00 - HQ CK Cha Lo Quảng Bình"
    }
  ],
  "31BF": [
    {
      value: "00",
      label: "00 - HQ CK Cà Roòng"
    }
  ],
  "31CD": [
    {
      value: "00",
      label: "00 - HQ CK Cảng Hòn La"
    },
    {
      value: "01",
      label: "01 - Đội nghiệp vụ Cảng Hòn La"
    },
    {
      value: "02",
      label: "02 - Đội nghiệp vụ Đồng Hới"
    },
    {
      value: "03",
      label: "03 - Đội nghiệp vụ Cảnh Giang"
    }
  ],
  "31D1": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ Cảng Hòn La"
    }
  ],
  "31D2": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ Đồng Hới"
    }
  ],
  "31D3": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ Cảng Gianh"
    }
  ],
  "31ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Quảng Bình"
    }
  ],
  "32BB": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ -Tổng hợp"
    }
  ],
  "32BC": [
    {
      value: "00",
      label: "00 - HQ CK La Lay"
    }
  ],
  "32BD": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ -Tổng hợp"
    }
  ],
  "32CD": [
    {
      value: "00",
      label: "00 - HQ CK Cảng Cửa Việt"
    }
  ],
  "32VG": [
    {
      value: "00",
      label: "00 - Đội Kiẻm soát HQ Quảng Trị"
    }
  ],
  "32ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Quảng Trị"
    }
  ],
  "33A1": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ - HQ CK AĐớt"
    }
  ],
  "33A2": [
    {
      value: "00",
      label: "00 - Đội NV Hồng Vân - HQ CK AĐớt"
    }
  ],
  "33BA": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ - HQ CK A Đớt"
    },
    {
      value: "01",
      label: "01 - Đội Nghiệp vụ HQ CK Hồng Vân - HQ CK A Đớt"
    }
  ],
  "33CC": [
    {
      value: "00",
      label: "00 - HQ Cảng Thuận An TT Huế"
    }
  ],
  "33CF": [
    {
      value: "00",
      label: "00 - HQ CK Cảng Chân Mây TT Huế"
    }
  ],
  "33PD": [
    {
      value: "00",
      label: "00 - HQ Thuỷ An"
    },
    {
      value: "02",
      label: "02 - HQ Thủy An"
    }
  ],
  "33ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Thừa thiên - Huế"
    }
  ],
  "34AB": [
    {
      value: "00",
      label: "00 - 00 Xử lý chung tại trụ sở Đội"
    },
    {
      value: "01",
      label: "01 - 01 Xử lý các tờ khai theo mã loại hình nhập khẩu"
    },
    {
      value: "02",
      label: "02 - 02 Xử lý các tờ khai theo mã loại hình xuất khẩu"
    }
  ],
  "34CC": [
    {
      value: "00",
      label: "00 - Bộ phận xử lý 00"
    }
  ],
  "34CE": [
    {
      value: "00",
      label: "00 - Bộ phận tiếp nhận 00"
    }
  ],
  "34NG": [
    {
      value: "00",
      label: "00 - 00 Xử lý chung tại trụ sở Đội"
    },
    {
      value: "01",
      label: "01 - 01 Xử lý Tờ khai tại Bộ phận Bưu chính"
    },
    {
      value: "02",
      label: "02 - 02 Xử lý Tờ khai tại Bộ phận Khu công nghệ cao"
    }
  ],
  "34NH": [
    {
      value: "00",
      label: "00 - HQ KCN Đà Nẵng"
    }
  ],
  "34ZZ": [
    {
      value: "00",
      label: "00 - Hải quan TP Đà Nẵng"
    }
  ],
  "35CB": [
    {
      value: "00",
      label: "00 - Bộ phận tiếp nhận 00"
    }
  ],
  "35NC": [
    {
      value: "00",
      label: "00 - Bộ phận tiếp nhận 00"
    }
  ],
  "35ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Quảng Ngãi"
    }
  ],
  "37CB": [
    {
      value: "00",
      label: "00 - HQ CK Cảng Qui Nhơn"
    }
  ],
  "37TC": [
    {
      value: "00",
      label: "00 - HQ Phú Yên Bình Định"
    }
  ],
  "37ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Bình Định"
    }
  ],
  "38B1": [
    {
      value: "00",
      label: "00 - Đội NVụ THợp-HQ CK Lệ Thanh"
    }
  ],
  "38B2": [
    {
      value: "00",
      label: "00 - Đội TT-HQ CK Lệ Thanh"
    }
  ],
  "38BB": [
    {
      value: "01",
      label: "01 - Đội thủ tục-HQ CK Lệ Thanh"
    }
  ],
  "38BC": [
    {
      value: "00",
      label: "00 - 00 Xử lý chung tại trụ sở Đội"
    },
    {
      value: "01",
      label: "01 - 01 Xử lý tại trụ sở Kon Tum"
    }
  ],
  "38PD": [
    {
      value: "00",
      label: "00 - HQ CK Kon Tum"
    }
  ],
  "38ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Gia Lai"
    }
  ],
  "40B1": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ 1 – HQ CK Buprăng"
    },
    {
      value: "01",
      label: "01 - Đội Nghiệp vụ 2 – HQ CK Buprăng"
    }
  ],
  "40B2": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ 2 - HQ CK Buprăng"
    }
  ],
  "40BC": [
    {
      value: "00",
      label: "00 - HQ Buôn Mê Thuột"
    },
    {
      value: "01",
      label: "01 - HQ Buôn Mê Thuột"
    }
  ],
  "40D1": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ 1 Đà Lạt"
    },
    {
      value: "01",
      label: "01 - Đội Nghiệp vụ 2 Bảo Lộc"
    }
  ],
  "40D2": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ - HQ Đà Lạt"
    }
  ],
  "40ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Đắc Lắc"
    }
  ],
  "41AB": [
    {
      value: "00",
      label: "00 - HQ CK sân bay quốc tế Cam Ranh"
    }
  ],
  "41BH": [
    {
      value: "00",
      label: "00 - HQ Ninh Thuận"
    }
  ],
  "41CB": [
    {
      value: "00",
      label: "00 - HQ CK Cảng Nha Trang"
    }
  ],
  "41CC": [
    {
      value: "00",
      label: "00 - HQ CK cảng Cam Ranh Khánh Hòa"
    }
  ],
  "41PE": [
    {
      value: "00",
      label: "00 - HQ Vân Phong"
    }
  ],
  "41ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Khánh Hoà"
    }
  ],
  "43CN": [
    {
      value: "00",
      label: "00 - Tiếp nhận Tờ khai hàng Xuất khẩu"
    },
    {
      value: "01",
      label: "01 - Tiếp nhận Tờ khai tại Cảng cạn Thạnh Phước"
    },
    {
      value: "02",
      label: "02 - Tiếp nhận tờ khai hàng Nhập khẩu"
    }
  ],
  "43IH": [
    {
      value: "00",
      label: "00 - Bộ phận tiếp nhận A11, A12, A41, A42, A21, H11, H21, B11"
    },
    {
      value: "01",
      label: "01 - Bộ phận tiếp nhận E31, E62"
    },
    {
      value: "02",
      label: "02 - Bộ phận tiếp nhận E21, E23, E52, E54, E82, E41, G12, G13, G22, G23, G14, G24, G51, G61, A31, B12, B13, C11"
    }
  ],
  "43K1": [
    {
      value: "00",
      label: "00 - Nhóm loại hình kinh doanh: A11, A12, A41, A42, A21, H11, H21, B11, G12, G22, G14, G24"
    },
    {
      value: "01",
      label: "01 - Nhóm loại hình GC, SXXK, DNCX và các loại hình khác: E21, E23, E31, E41, E52, E54, E62, E82, E11, E13, E15, E42, G13, G23, G51, G61, A31, B12, B13"
    }
  ],
  "43K2": [
    {
      value: "00",
      label: "00 - Đội thủ tục HQ Khu Liên Hợp (Bình Dương)"
    }
  ],
  "43K3": [
    {
      value: "00",
      label: "00 - Đội thủ tục HQ KCN Tân Định (Bình Dương)"
    }
  ],
  "43K4": [
    {
      value: "01",
      label: "01 - Nhóm loại hình GC, SXXK, DNCX và các loại hình khác: E21, E23, E31, E41, E52, E54, E62, E82, E11, E13, E15, E42, G13, G23, G51, G61, A31, B12, B13 "
    }
  ],
  "43ND": [
    {
      value: "00",
      label: "00 - Bộ phận xử lý hàng hóa NK, XK A11, A12, A41, A42, A21, B11, E13"
    },
    {
      value: "01",
      label: "01 - Bộ phận xử lý hàng hóa NK, XK E11, E15, E42, E31, E62, E21, E52, E23, E54, E41, E82, B13, A31"
    },
    {
      value: "02",
      label: "02 - Bộ phận xử lý hàng hóa G12, G13, G22, G23, G14, G24, G51, G61, B12, C11, H11, H21"
    }
  ],
  "43NF": [
    {
      value: "00",
      label: "00 - Bộ phận xử lý A11, A12, A41, A42, A21, H11, H21, B11"
    },
    {
      value: "01",
      label: "01 - Bộ phận xử lý E11, E15, E42"
    },
    {
      value: "02",
      label: "02 - Bộ phận xử lý E13, E62, E31, E21, E23, E52, E54, E82, E41, G12, G13, G22, G23, G14, G24, G51, G61, A31, B12, B13"
    }
  ],
  "43NG": [
    {
      value: "00",
      label: "00 - Bộ phận xử lý A11, A12, A41, A42, H11, G12, G22, G51, G61"
    },
    {
      value: "01",
      label: "01 - Bộ phận xử lý E31, A31, A21, B11, B12, B13,  E62, H21"
    },
    {
      value: "02",
      label: "02 - Bộ phận xử lý E21, E23, E52, E54, G13, G23, E11, E13, E15, E42"
    }
  ],
  "43PB": [
    {
      value: "00",
      label: "00 - Bộ phận xử lý A11, A12, A31, A41, A42, H11, G12, G22"
    },
    {
      value: "01",
      label: "01 - Bộ phận xử lý B11, B12, B13, H21, G13, G23, G51, G61"
    },
    {
      value: "02",
      label: "02 - Bộ phận xử lý E11, E13, E15, E21, E23, E52, E54, E42"
    },
    {
      value: "03",
      label: "03 - Bộ phận xử lý E31, A31, E62"
    }
  ],
  "43PC": [
    {
      value: "00",
      label: "00 - Tiếp nhận tờ khai loại hình: A11, A12, A21, A41, A42, H11, H21,C11"
    },
    {
      value: "01",
      label: "01 - Tiếp nhận tờ khai loại hình: B11, E31, E62"
    },
    {
      value: "02",
      label: "02 - Tiếp nhận tờ khai loại hình: E15, E42, B12, B13, E21, E23, E41, E52, E54, E82, G12, G22, G13, G23, G51, G61, A31, E11, E13"
    }
  ],
  "43ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Bình Dương"
    }
  ],
  "45B1": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ - HQ Mộc Bài TN"
    }
  ],
  "45B2": [
    {
      value: "00",
      label: "00 - Đội Quản lý Khu TM - CN Mộc Bài"
    }
  ],
  "45BB": [
    {
      value: "01",
      label: "01 - Đội Quản lý Khu TM - CN Mộc Bài"
    }
  ],
  "45BC": [
    {
      value: "01",
      label: "01 - Đội thủ tục Hải quan Chàng Riệc"
    }
  ],
  "45BD": [
    {
      value: "00",
      label: "00 - HQ Phước Tân Tây Ninh"
    }
  ],
  "45BE": [
    {
      value: "00",
      label: "00 - HQ CK Katum Tây Ninh"
    }
  ],
  "45C1": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ - HQ Xa Mát TN"
    }
  ],
  "45C2": [
    {
      value: "00",
      label: "00 - Đội TT Chàng Riệc-HQ Xa Mát TN"
    }
  ],
  "45F1": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ-HQ Trảng Bàng TN"
    }
  ],
  "45F2": [
    {
      value: "00",
      label: "00 - Đội TTHQ Khu C.Nghiệp Phước Đông"
    }
  ],
  "45ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Tây Ninh"
    }
  ],
  "47CI": [
    {
      value: "00",
      label: "00 - hải quan Long Tân Bình"
    }
  ],
  "47D1": [
    {
      value: "00",
      label: "00 - Bộ phận quản lý tờ khai tại Trụ sở Đội"
    },
    {
      value: "01",
      label: "01 - Bộ phận quản lý tờ khai tại Cảng Gò Dầu"
    },
    {
      value: "02",
      label: "02 - Bộ phận quản lý tờ khai tại Cảng nội địa khác"
    },
    {
      value: "03",
      label: "03 - Bộ phận quản lý tờ khai tại Cảng Long Bình Tân (Cảng Đồng Nai)"
    }
  ],
  "47D2": [
    {
      value: "00",
      label: "00 - hải quan Cửa khẩu cảng Đồng Nai - Đội nghiệp vụ Hải quan số 2"
    }
  ],
  "47D3": [
    {
      value: "00",
      label: "00 - Bộ phận quản lý tờ khai tại KCN Long Đức"
    },
    {
      value: "01",
      label: "01 - Bộ phận quản lý tờ khai tại KCN Nhóm 1"
    },
    {
      value: "02",
      label: "02 - Bộ phận quản lý tờ khai tại KCN Nhóm 2"
    },
    {
      value: "03",
      label: "03 - Bộ phận quản lý tờ khai tại KCN Nhóm 3"
    }
  ],
  "47I1": [
    {
      value: "00",
      label: "00 - Bộ phận xử lý tờ khai tại ICD Tân cảng Long Bình"
    },
    {
      value: "01",
      label: "01 - Bộ phận quản lý kho ngoại quan nhóm 1"
    },
    {
      value: "02",
      label: "02 - Bộ phận quản lý kho ngoại quan nhóm 2"
    },
    {
      value: "03",
      label: "03 - Bộ phận quản lý kho ngoại quan nhóm 3"
    }
  ],
  "47I2": [
    {
      value: "00",
      label: "00 - Đội NV2, HQ Long Bình Tân, Đ.Nai"
    }
  ],
  "47NB": [
    {
      value: "00",
      label: "00 - Bộ phận quản lý tờ khai KCN Biên Hòa nhóm 1"
    },
    {
      value: "01",
      label: "01 - Bộ phận quản lý tờ khai KCN Biên Hòa nhóm 2"
    },
    {
      value: "02",
      label: "02 - Bộ phận quản lý tờ khai tại KCN Amata nhóm 1"
    },
    {
      value: "03",
      label: "03 - Bộ phận quản lý tờ khai tại KCN Amata nhóm 2"
    }
  ],
  "47NF": [
    {
      value: "00",
      label: "00 - Bộ phận quản lý tờ khai tại Trụ sở Đội KCN"
    },
    {
      value: "01",
      label: "01 - Bộ phận quản lý tờ khai tại KCN Nhóm 1"
    },
    {
      value: "02",
      label: "02 - Bộ phận quản lý tờ khai tại KCN Nhóm 2"
    },
    {
      value: "03",
      label: "03 - Bộ phận quản lý tờ khai tại KCN Nhóm 3"
    }
  ],
  "47NG": [
    {
      value: "00",
      label: "00 - Bộ phận quản lý tờ khai tại Trụ sở đội"
    },
    {
      value: "01",
      label: "01 - Bộ phận quản lý tờ khai tại Cảng Phước An"
    },
    {
      value: "02",
      label: "02 - Bộ phận quản lý kho ngoại quan ICD Tân Cảng - Nhơn Trạch"
    },
    {
      value: "03",
      label: "03 - Bộ phận quản lý Cảng Nội địa khác"
    },
    {
      value: "04",
      label: "04 - Bộ phận quản lý các Kho ngoại quan"
    }
  ],
  "47NM": [
    {
      value: "00",
      label: "00 - HQ CK Cảng Bình Thuận"
    }
  ],
  "47XE": [
    {
      value: "00",
      label: "00 - Bộ phận quản lý tờ khai tại DN tại khu vực Loteco"
    },
    {
      value: "01",
      label: "01 - Bộ phận quản lý tờ khai tại DNCX Nhóm 1"
    },
    {
      value: "02",
      label: "02 - Bộ phận quản lý tờ khai tại DNCX Nhóm 2"
    },
    {
      value: "03",
      label: "03 - Bộ phận quản lý tờ khai tại DNCX Nhóm 3"
    }
  ],
  "47ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Đồng Nai"
    }
  ],
  "48BC": [
    {
      value: "00",
      label: "00 - HQ Mỹ Quý Tây Long An"
    }
  ],
  "48BD": [
    {
      value: "00",
      label: "00 - HQ Bình Hiệp Long An"
    }
  ],
  "48BE": [
    {
      value: "00",
      label: "00 - HQ Hưng Điền"
    }
  ],
  "48BG": [
    {
      value: "00",
      label: "00 - HQ Bến Tre"
    }
  ],
  "48BI": [
    {
      value: "00",
      label: "00 - HQ Đức Hòa Long An"
    }
  ],
  "48CF": [
    {
      value: "01",
      label: "01 - Bộ phận xử lý 01"
    },
    {
      value: "02",
      label: "02 - Bộ phận xử lý 02"
    }
  ],
  "48CG": [
    {
      value: "00",
      label: "00 - Đội nghiệp vụ - HQCK Mỹ Tho"
    }
  ],
  "48F1": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ KCN Long Hậu"
    }
  ],
  "48F2": [
    {
      value: "00",
      label: "00 - Đội Thủ tục- HQ Bến Lức"
    }
  ],
  "48K1": [
    {
      value: "00",
      label: "00 - Tiếp nhận tờ khai loại hình kinh doanh"
    },
    {
      value: "01",
      label: "01 - Tiếp nhận tờ khai loại hình SXXK"
    },
    {
      value: "02",
      label: "02 - Tiếp nhận tờ khai loại hình chế xuất"
    },
    {
      value: "03",
      label: "03 - Tiếp nhận tờ khai loại hình gia công và loại hình khác"
    }
  ],
  "48ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Long An"
    }
  ],
  "49BB": [
    {
      value: "00",
      label: "00 - HQ CK Thường Phước"
    }
  ],
  "49BE": [
    {
      value: "00",
      label: "00 - HQ Sở Thượng Đồng Tháp"
    }
  ],
  "49BF": [
    {
      value: "00",
      label: "00 - HQ  Thông Bình"
    }
  ],
  "49BG": [
    {
      value: "00",
      label: "00 - HQ CK Dinh Bà"
    }
  ],
  "49C1": [
    {
      value: "00",
      label: "00 - HQ CK Cảng Cao Lãnh"
    }
  ],
  "49C2": [
    {
      value: "00",
      label: "00 - Chi nhánh HQ CK Cảng Sa Đéc"
    }
  ],
  "49CC": [
    {
      value: "01",
      label: "01 - HQ CK Cảng Đồng Tháp"
    }
  ],
  "49ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Đồng Tháp"
    }
  ],
  "50BB": [
    {
      value: "00",
      label: "00 - HQ CK Tịnh Biên"
    }
  ],
  "50BC": [
    {
      value: "00",
      label: "00 - HQ Vĩnh Hội Đông"
    }
  ],
  "50BD": [
    {
      value: "00",
      label: "00 - HQ CK Vĩnh Xương"
    }
  ],
  "50BJ": [
    {
      value: "00",
      label: "00 - HQ Bắc Đai"
    }
  ],
  "50BK": [
    {
      value: "00",
      label: "00 - HQ Khánh Bình"
    }
  ],
  "50CE": [
    {
      value: "00",
      label: "00 - HQ Cảng Mỹ Thới"
    }
  ],
  "50ZZ": [
    {
      value: "00",
      label: "00 - Hải quan An Giang"
    }
  ],
  "51BE": [
    {
      value: "00",
      label: "00 - Bộ phận thủ tục"
    }
  ],
  "51C1": [
    {
      value: "00",
      label: "00 - Hàng hóa nhập khẩu loại hình: A11, A12, A41, C11, E11, E13, E15, G11, G21"
    },
    {
      value: "01",
      label: "01 - Hàng hóa nhập khẩu, xuất khẩu loại hình: A42, A21, H11, H21, B11, E31, E62, E21, E23, E52, E82, E41, G12, G13, G22, G23, G14, G24, G51, G61, A31, B12, B13, E42, A43, A44, E33"
    }
  ],
  "51C2": [
    {
      value: "00",
      label: "00 - Đội Thủ tục SP-PSA"
    }
  ],
  "51CB": [
    {
      value: "00",
      label: "00 - Bộ phận thủ tục"
    }
  ],
  "51CH": [
    {
      value: "00",
      label: "00 - Bộ phận thủ tục"
    }
  ],
  "51CI": [
    {
      value: "00",
      label: "00 - Hải quan Cái Mép"
    }
  ],
  "51ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Bà Rịa - Vũng Tàu"
    }
  ],
  "53BC": [
    {
      value: "00",
      label: "00 - HQCK Quốc Tế Hà Tiên"
    }
  ],
  "53BK": [
    {
      value: "00",
      label: "00 - HQ CK Giang Thành"
    }
  ],
  "53CD": [
    {
      value: "00",
      label: "00 - HQ CK Cảng Hòn Chông"
    }
  ],
  "53CH": [
    {
      value: "00",
      label: "00 - HQ Phú Quốc"
    }
  ],
  "53ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Kiên Giang"
    }
  ],
  "54CB": [
    {
      value: "00",
      label: "00 - HQ CK Cảng Cần Thơ"
    }
  ],
  "54CD": [
    {
      value: "00",
      label: "00 - HQ CK Vĩnh Long"
    }
  ],
  "54CE": [
    {
      value: "00",
      label: "00 - Hải quan Hậu Giang"
    }
  ],
  "54CF": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ Hải quan Cửa khẩu cảng Trà Vinh"
    }
  ],
  "54PH": [
    {
      value: "00",
      label: "00 - HQ Tây Đô"
    }
  ],
  "54PK": [
    {
      value: "00",
      label: "00 - HQ Sóc Trăng"
    }
  ],
  "54ZZ": [
    {
      value: "00",
      label: "00 - Hải quan TP Cần Thơ"
    }
  ],
  "59BD": [
    {
      value: "00",
      label: "00 - HQ CK Cảng Năm Căn"
    }
  ],
  "59BE": [
    {
      value: "00",
      label: "00 - Đội nghiệp vụ Hải quan Bạc Liêu"
    }
  ],
  "59CB": [
    {
      value: "00",
      label: "00 - HQ CK Cảng Năm Căn"
    }
  ],
  "59ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Cà Mau"
    }
  ],
  "60BD": [
    {
      value: "00",
      label: "00 - Bộ phận tiếp nhận 00"
    }
  ],
  "60C1": [
    {
      value: "00",
      label: "00 - Bộ phận tiếp nhận 00"
    }
  ],
  "60C2": [
    {
      value: "00",
      label: "00 - Bộ phận tiếp nhận 00"
    }
  ],
  "60CB": [
    {
      value: "00",
      label: "00 - 00 Xử lý Tờ khai tại Kỳ Hà"
    },
    {
      value: "01",
      label: "01 - 01 Xử lý Tờ khai tại Chu Lai"
    },
    {
      value: "02",
      label: "02 - 02 Xử lý tờ khai tại Tam Kỳ"
    }
  ],
  "60ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Quảng Nam"
    }
  ],
  "61A1": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ Tổng hợp"
    }
  ],
  "61A2": [
    {
      value: "00",
      label: "00 - Đội TTHQ CK Tà Vát"
    }
  ],
  "61A3": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ"
    }
  ],
  "61A4": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ 2"
    }
  ],
  "61B1": [
    {
      value: "00",
      label: "00 - Đội NV Tổng hợp-Hoàng Diệu"
    }
  ],
  "61B2": [
    {
      value: "00",
      label: "00 - Đội NV CK Tân Tiến-Hoàng Diệu"
    }
  ],
  "61BA": [
    {
      value: "00",
      label: "00 - Bộ phận tiếp nhận HQ CK Quốc tế Hoa Lư"
    },
    {
      value: "01",
      label: "01 - Lối mở Lộc Tấn"
    }
  ],
  "61BB": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ - HQ CK Hoàng Diệu"
    }
  ],
  "61BC": [
    {
      value: "00",
      label: "00 - HQ Cửa khẩu Lộc Thịnh"
    }
  ],
  "61PA": [
    {
      value: "00",
      label: "00 - Đội Nghiệp vụ - HQ Chơn Thành"
    }
  ],
  "61ZZ": [
    {
      value: "00",
      label: "00 - Hải quan Bình Phước"
    }
  ]
}