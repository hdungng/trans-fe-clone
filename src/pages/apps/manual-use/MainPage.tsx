import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import login from 'assets/images/manual-use/login.png';
import dashboard from 'assets/images/manual-use/dashboard.png';
import customerList from 'assets/images/manual-use/customer-list.png';
import defaultSetting from 'assets/images/manual-use/default-setting.png';
import masterList from 'assets/images/manual-use/master-list-page.png';
import masterListEdit from 'assets/images/manual-use/master-list-edit.png';
import masterListExcel from 'assets/images/manual-use/excel.png';


import jobNumberStep1 from 'assets/images/manual-use/job-number-step-1.png';
import jobNumberStep2 from 'assets/images/manual-use/job-number-step-2.png';
import jobNumberStep3 from 'assets/images/manual-use/job-number-step-3.png';
import jobNumberStep4 from 'assets/images/manual-use/job-number-step-4.png';
import jobNumberStep4_2 from 'assets/images/manual-use/job-number-step-4-2.png';
import jobNumberStep1Alert from 'assets/images/manual-use/job-number-step-1-alert.png';
import jobNumberList from 'assets/images/manual-use/job-number-list.png';
import jobNumberDetail from 'assets/images/manual-use/job-number-detail.png';
import userList from 'assets/images/manual-use/user-list.png';
import userAdd from 'assets/images/manual-use/add-user.png';
import { Grid } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { TreeItem } from '@mui/x-tree-view';
import ImageZoom from 'components/common/ImageZooom';



// Định nghĩa kiểu dữ liệu cho các section
interface SectionRefs {
    [key: string]: React.RefObject<HTMLDivElement | null>;
}

const MainPage: React.FC = () => {
    const sidebarPlaceholderRef = useRef<HTMLDivElement>(null);
    // Tạo các ref cho các phần nội dung tương ứng với từng TreeItem
    const sectionRefs: SectionRefs = {
        login: useRef<HTMLDivElement>(null),
        dashboard: useRef<HTMLDivElement>(null),
        customer: useRef<HTMLDivElement>(null),
        masterList: useRef<HTMLDivElement>(null),
        jobNumber: useRef<HTMLDivElement>(null),
        server: useRef<HTMLDivElement>(null),
        jobList: useRef<HTMLDivElement>(null),
        userScreen: useRef<HTMLDivElement>(null),
    };

    const [activeItem, setActiveItem] = useState<string>('');


    const handleTreeItemClick = (itemId: string) => {
        if (sectionRefs[itemId] && sectionRefs[itemId].current) {
            sectionRefs[itemId].current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
            });
        }
        setActiveItem(itemId);
    };

    const [sidebarTop, setSidebarTop] = useState(250);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setSidebarTop(80); // khi bắt đầu cuộn
            } else {
                setSidebarTop(250); // ở đầu trang
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const options = {
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const itemId = entry.target.id;
                    setActiveItem(itemId);
                }
            });
        }, options);

        Object.values(sectionRefs).forEach((ref) => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            Object.values(sectionRefs).forEach((ref) => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, []);

    return (
        <MainCard sx={{ padding: 2, borderRadius: 2 }}>
            {/* Step 1: Đăng nhập */}
            <Grid container spacing={2}>
                {/* Phần Content bên trái */}
                <Grid size={7}>
                    <Typography variant="h5" gutterBottom ref={sectionRefs.login} id="login">
                        1. Đăng Nhập
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Đăng nhập bằng thông tin được cấp theo từng khách hàng và tác nghiệp.
                    </Typography>

                    <ImageZoom imageSrc={login} altText="Guiding Image" />

                    {/* Step 2: Màn hình chính */}
                    <Typography variant="h5" sx={{ marginTop: 7, marginBottom: 3 }} gutterBottom ref={sectionRefs.dashboard} id="dashboard">
                        2. Màn Hình Chính (Bảng Điều Khiển)
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Màn hình chính của TRA-SAS AI giúp người dùng có thể xem tổng quan về các Job Number đã tạo, trạng thái, thống kê của từng Job trong hệ thống.
                    </Typography>

                    <ImageZoom imageSrc={dashboard} altText="Guiding Image" />

                    {/* Step 3: Màn hình Khách hàng + Thiết lập thông số mặc định */}
                    <Typography variant="h5" sx={{ marginTop: 10 }} gutterBottom ref={sectionRefs.customer} id="customer">
                        3. Màn Hình Khách Hàng + Thiết Lập Thông Số Mặc Định
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Khi vào tab Khách hàng, người dùng có thể lọc, tìm kiếm, xuất Excel và thao tác cơ bản như thêm, cập nhật, xóa khách hàng trong hệ thống.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Để thiết lập thông số mặc định của khách hàng cụ thể, nhấn vào nút màu vàng ở cột Chức năng phía bên phải.
                    </Typography>
                    <ImageZoom imageSrc={customerList} altText="Guiding Image" />


                    <Typography variant="body1" paragraph>
                        Hệ thống sẽ tự động hiện ra biểu mẫu để cập nhật thông số mặc định của khách hàng theo Tác nghiệp.
                    </Typography>

                    <ImageZoom imageSrc={defaultSetting} altText="Guiding Image" />


                    {/* Step 4: Màn hình Master List */}
                    <Typography variant="h5" sx={{ marginTop: 10 }} gutterBottom ref={sectionRefs.masterList} id="masterList">
                        4. Màn Hình Master List
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Vào màn hình Master List, hãy nhập vào trường Mã số thuế của công ty và chọn Tác nghiệp.
                    </Typography>

                    <ImageZoom imageSrc={masterList} altText="Guiding Image" />

                    <Typography variant="body1" paragraph>
                        Khi ấn nút Cập Nhật hoặc Thêm Mới, biểu mẫu sẽ hiển thị để chọn hoặc cập nhật Master List, vui lòng gửi lên File Master List Excel có format các dòng, cột nằm ở đầu tiên.
                    </Typography>

                    <ImageZoom imageSrc={masterListExcel} altText="Guiding Image" />

                    <ImageZoom imageSrc={masterListEdit} altText="Guiding Image" />


                    {/* Step 5: Màn hình Thêm Mới Job Number */}
                    <Typography variant="h5" sx={{ marginTop: 10 }} gutterBottom ref={sectionRefs.jobNumber} id="jobNumber">
                        5. Màn Hình Thêm Mới Job Number
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Bước 1: Điền thông tin Job Number. Khi vào màn hình Thêm mới, hãy nhập 4 thông tin ở phía trên, khi điền trường Mã số thuế, toàn bộ thông tin công ty sẽ hiển thị ở phía dưới để kiểm tra thông tin trước khi chuyển sang bước tiếp theo.
                    </Typography>

                    <img src={jobNumberStep1} alt="Image description" style={{ width: '100%', marginBottom: 10 }} />
                    <ImageZoom imageSrc={jobNumberStep1} altText="Guiding Image" />

                    <Typography variant="body1" paragraph>
                        Trong trường hợp người dùng chưa cài đặt tham số mặc định và Master List, trình duyệt sẽ cảnh báo rằng người dùng có muốn tiếp tục hay không do sẽ ảnh hưởng đến kết quả trả về của AI.
                    </Typography>

                    <ImageZoom imageSrc={jobNumberStep1Alert} altText="Guiding Image" />

                    <Typography variant="body1" paragraph>
                        Bước 2: Tải lên chứng từ (file PDF). Sau khi tải lên, nhấn nút "Tiếp Theo" để chờ AI thực hiện tác vụ Kiểm Tra Chéo.
                    </Typography>

                    <ImageZoom imageSrc={jobNumberStep2} altText="Guiding Image" />

                    <Typography variant="body1" paragraph>
                        Bước 3: Kiểm tra kết quả trả về và xuất kết quả sang Excel.
                    </Typography>

                    <ImageZoom imageSrc={jobNumberStep3} altText="Guiding Image" />

                    <Typography variant="body1" paragraph>
                        Bước 4: Trích xuất thông tin từ chứng từ và hiển thị thông tin này trên trình duyệt.
                    </Typography>

                    <ImageZoom imageSrc={jobNumberStep4} altText="Guiding Image" />


                    {/* Step 6: Gửi Máy Chủ Nhập Liệu ECUS */}
                    <Typography variant="h5" sx={{ marginTop: 10 }} gutterBottom ref={sectionRefs.server} id="server">
                        6. Gửi Máy Chủ Nhập Liệu ECUS
                    </Typography>

                    <Typography variant="body1" paragraph>
                        Chạy file startup.bat (chỉ chạy 1 lần) ở màn hình chính và mở sẵn ECUS ở màn hình mặc định mỗi khi khởi động lại máy (dấu hiệu nhận biết đã thành công là cửa sổ màu đen).
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Khi ấn nút Gửi Máy Chủ Nhập Liệu, ECUS sẽ khởi động và nhập liệu tự động.
                    </Typography>

                    <ImageZoom imageSrc={jobNumberStep4_2} altText="Guiding Image" />

                    {/* Step 7: Màn hình danh sách Job Number */}
                    <Typography variant="h5" sx={{ marginTop: 10 }} gutterBottom ref={sectionRefs.jobList} id="jobList">
                        7. Màn Hình Danh Sách Job Number
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Tại màn hình danh sách, các Job Number đã tạo được nhóm theo Tên Job Number, Công Ty, Tác Nghiệp, Người Tạo. Tại đây, người dùng có thể Tìm kiếm, Lọc, Xem chi tiết (icon màu xanh) và Xóa một nhóm Job Number (Dòng cha), hoặc Xóa một Job Number cụ thể (Dòng con phía dưới).
                    </Typography>

                    <ImageZoom imageSrc={jobNumberList} altText="Guiding Image" />


                    <Typography variant="body1" paragraph>
                        Khi xem Chi Tiết 1 Job Number bất kì, giao diện Chi tiết hiển thị thông tin cơ bản các Job Number đã tạo từ bước đầu tiên kèm theo thông tin đã trích xuất từ bước cuối.
                    </Typography>

                    <ImageZoom imageSrc={jobNumberDetail} altText="Guiding Image" />

                    {/* Step 8: Màn hình Người Dùng */}
                    <Typography variant="h5" sx={{ marginTop: 10 }} gutterBottom ref={sectionRefs.userScreen} id="userScreen">
                        8. Màn Hình Người Dùng
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Màn hình Người Dùng cho phép admin thực hiện các thao tác cơ bản (thêm mới, cập nhật, xóa, xuất file Excel) đối với tài khoản người dùng trong hệ thống. Tại đây, admin có thể lọc và tìm kiếm tài khoản người dùng.
                    </Typography>

                    <ImageZoom imageSrc={userList} altText="Guiding Image" />

                    <Typography variant="body1" paragraph>
                        Tại cửa sổ này, người dùng có thể tạo mới 1 người dùng dựa trên các trường thông tin sau.
                    </Typography>
                    <ImageZoom imageSrc={userAdd} altText="Guiding Image" />

                </Grid>
                {/* Phần List điều hướng bên phải */}
                <Grid size={5} sx={{ paddingLeft: 2, borderLeft: '1px solid #e0e0e0', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
                    <Box ref={sidebarPlaceholderRef}
                        sx={{
                            position: "fixed",
                            left: "auto",
                            top: `${sidebarTop}px`,
                            width: "450px",
                            overflowY: "auto",
                            backgroundColor: "background.paper",
                        }}>
                        <Typography variant="h5" gutterBottom>
                            Mục lục
                        </Typography>

                        <SimpleTreeView
                            aria-label="file system navigator"
                            slots={{ collapseIcon: DownOutlined, expandIcon: RightOutlined }}
                            defaultExpandedItems={['1']}
                            sx={{
                                zflexGrow: 1,
                                maxWidth: 400,
                                overflowY: 'auto',
                                '.MuiTreeItem-content[data-selected], .MuiTreeItem-content[data-selected]:hover, .MuiTreeItem-content[data-selected][data-focused]': {
                                    backgroundColor: 'transparent',
                                }
                            }}
                        >
                            <TreeItem
                                itemId="login"
                                label="1. Đăng Nhập"
                                onClick={() => handleTreeItemClick('login')}
                                style={{
                                    backgroundColor: activeItem === 'login' ? '#E3EEFF' : 'transparent',
                                }}
                            />
                            <TreeItem
                                itemId="dashboard"
                                label="2. Màn Hình Chính (Bảng Điều Khiển)"
                                onClick={() => handleTreeItemClick('dashboard')}
                                style={{
                                    backgroundColor: activeItem === 'dashboard' ? '#E3EEFF' : 'transparent',
                                }}
                            />
                            <TreeItem
                                itemId="customer"
                                label="3. Màn Hình Khách Hàng + Thiết Lập Thông Số Mặc Định"
                                onClick={() => handleTreeItemClick('customer')}
                                style={{
                                    backgroundColor: activeItem === 'customer' ? '#E3EEFF' : 'transparent',
                                }}
                            />
                            <TreeItem
                                itemId="masterList"
                                label="4. Màn Hình Master List"
                                onClick={() => handleTreeItemClick('masterList')}
                                style={{
                                    backgroundColor: activeItem === 'masterList' ? '#E3EEFF' : 'transparent',
                                }}
                            />
                            <TreeItem
                                itemId="jobNumber"
                                label="5. Màn Hình Thêm Mới Job Number"
                                onClick={() => handleTreeItemClick('jobNumber')}
                                style={{
                                    backgroundColor: activeItem === 'jobNumber' ? '#E3EEFF' : 'transparent',
                                }}
                            />
                            <TreeItem
                                itemId="server"
                                label="6. Gửi Máy Chủ Nhập Liệu ECUS"
                                onClick={() => handleTreeItemClick('server')}
                                style={{
                                    backgroundColor: activeItem === 'server' ? '#E3EEFF' : 'transparent',
                                }}
                            />
                            <TreeItem
                                itemId="jobList"
                                label="7. Màn Hình Danh Sách Job Number"
                                onClick={() => handleTreeItemClick('jobList')}
                                style={{
                                    backgroundColor: activeItem === 'jobList' ? '#E3EEFF' : 'transparent',
                                }}
                            />
                            <TreeItem
                                itemId="userScreen"
                                label="8. Màn Hình Người Dùng"
                                onClick={() => handleTreeItemClick('userScreen')}
                                style={{
                                    backgroundColor: activeItem === 'userScreen' ? '#E3EEFF' : 'transparent',
                                }}
                            />
                        </SimpleTreeView>
                    </Box>
                </Grid>
            </Grid>
        </MainCard >
    );
};

export default MainPage;
