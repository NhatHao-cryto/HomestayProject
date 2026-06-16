import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer class="w-full pt-20 pb-10 bg-primary text-white">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop max-w-container-max mx-auto">
        <div class="flex flex-col gap-4">
          <div class="font-headline-md text-headline-md text-secondary-fixed">Luxestay</div>
          <p class="font-body-md text-body-md text-surface-variant max-w-[240px]">
            Tinh hoa kỳ nghỉ Việt. Mang đến những trải nghiệm homestay sang trọng và đẳng cấp nhất.
          </p>
        </div>
        <div class="flex flex-col gap-4">
          <h4 class="font-label-md text-label-md text-on-primary font-bold uppercase tracking-widest">DỊCH VỤ</h4>
          <ul class="flex flex-col gap-3">
            <li>
              <Link to="/homestays" class="font-body-md text-body-md text-surface-variant hover:text-secondary-fixed transition-colors">
                Homestay cao cấp
              </Link>
            </li>
            <li>
              <a href="#" class="font-body-md text-body-md text-surface-variant hover:text-secondary-fixed transition-colors">
                Trải nghiệm địa phương
              </a>
            </li>
            <li>
              <a href="#" class="font-body-md text-body-md text-surface-variant hover:text-secondary-fixed transition-colors">
                Tổ chức sự kiện
              </a>
            </li>
          </ul>
        </div>
        <div class="flex flex-col gap-4">
          <h4 class="font-label-md text-label-md text-on-primary font-bold uppercase tracking-widest">THÔNG TIN</h4>
          <ul class="flex flex-col gap-3">
            <li>
              <a href="#" class="font-body-md text-body-md text-surface-variant hover:text-secondary-fixed transition-colors">
                Về chúng tôi
              </a>
            </li>
            <li>
              <Link to="/cam-nang" class="font-body-md text-body-md text-surface-variant hover:text-secondary-fixed transition-colors">
                Cẩm nang du lịch
              </Link>
            </li>
            <li>
              <Link to="/ho-tro" class="font-body-md text-body-md text-surface-variant hover:text-secondary-fixed transition-colors">
                Liên hệ hỗ trợ
              </Link>
            </li>
          </ul>
        </div>
        <div class="flex flex-col gap-4">
          <h4 class="font-label-md text-label-md text-on-primary font-bold uppercase tracking-widest">CHÍNH SÁCH</h4>
          <ul class="flex flex-col gap-3">
            <li>
              <a href="#" class="font-body-md text-body-md text-surface-variant hover:text-secondary-fixed transition-colors">
                Điều khoản dịch vụ
              </a>
            </li>
            <li>
              <a href="#" class="font-body-md text-body-md text-surface-variant hover:text-secondary-fixed transition-colors">
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a href="#" class="font-body-md text-body-md text-surface-variant hover:text-secondary-fixed transition-colors">
                Quy định hoàn tiền
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="max-w-container-max mx-auto px-margin-desktop mt-16 pt-8 border-t border-outline/10 flex justify-between items-center">
        <p class="font-body-md text-body-md text-outline-variant">
          © 2024 Luxestay. Tinh hoa kỳ nghỉ Việt.
        </p>
        <div class="flex gap-6">
          <span class="material-symbols-outlined text-outline-variant cursor-pointer hover:text-secondary-fixed">
            face_nod
          </span>
          <span class="material-symbols-outlined text-outline-variant cursor-pointer hover:text-secondary-fixed">
            language
          </span>
          <span class="material-symbols-outlined text-outline-variant cursor-pointer hover:text-secondary-fixed">
            mail
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
