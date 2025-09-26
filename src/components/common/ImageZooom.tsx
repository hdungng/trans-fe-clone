import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, IconButton } from '@mui/material';
import { CloseCircleOutlined } from '@ant-design/icons';

// Định nghĩa kiểu cho prop nhận ảnh
interface ImageZoomProps {
  imageSrc: string; // Đường dẫn ảnh để phóng to
  altText: string; // Mô tả ảnh
}

const ImageZoom: React.FC<ImageZoomProps> = ({ imageSrc, altText }) => {
  const [open, setOpen] = useState<boolean>(false); // Trạng thái mở/đóng modal
  const [zoomedImageSrc, setZoomedImageSrc] = useState<string>(''); // Lưu trữ ảnh được chọn để phóng to

  // Hàm mở modal và thiết lập ảnh
  const handleOpen = (src: string) => {
    setZoomedImageSrc(src);
    setOpen(true);
  };

  // Hàm đóng modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
      {/* Hiển thị ảnh và mở modal khi nhấp */}
      <img
        src={imageSrc}
        alt={altText}
        style={{ width: '100%', cursor: 'pointer' }}
        onClick={() => handleOpen(imageSrc)} // Mở modal khi nhấp vào ảnh
      />

      {/* Modal (Dialog) hiển thị ảnh phóng to */}
      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogActions>
          {/* Nút đóng modal */}
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <CloseCircleOutlined />
          </IconButton>
        </DialogActions>
        <DialogContent>
          <img
            src={zoomedImageSrc}
            alt="Zoomed Image"
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageZoom;
