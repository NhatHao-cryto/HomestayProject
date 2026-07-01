import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ASPECTS = [
  { key: 'cleanliness', label: 'Sạch sẽ' },
  { key: 'service', label: 'Dịch vụ' },
  { key: 'location', label: 'Vị trí' },
  { key: 'value', label: 'Đáng giá tiền' },
];

const RATING_LABELS = ['', 'Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];

// Trong thực tế dữ liệu này nên được lấy theo id đặt phòng (useParams)
const booking = {
  id: 'LX-12345',
  homestayId: '1', // id của homestay tương ứng trong CTHomestay, dùng để gắn đánh giá đúng nơi
  name: 'Sapa Mountain Retreat',
  location: 'Mường Hoa, Sa Pa, Lào Cai',
  image:
    'https://lh3.googleusercontent.com/aida/ADBb0ujY01G_CdHUxeONz3BdbMQoXe7oGbI60wy_rwP33fBsGszsNnJNeaXKApOXSBFHHNHVsIppKqxLGQAgRYDc4beOMasHFwdzWYH6LtkFEXcHRdMsQTZe1YR5fj0ywfEz8H-Jj6tWIBi1GBuziz6xdHVIopLJm949nFrxW0zvj2Z-SPQJrETd-yteN2Ont1QjcwvpV6Lez6cANSL-AyscqMKOytOKCbAeFwiGuQyeqfmypPikUfAkgvCNNA',
  checkIn: '15 Th05, 2024',
  checkOut: '18 Th05, 2024',
};

const StarRow = ({ value, onChange, size = 'text-[32px]' }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = (hover || value) >= n;
        return (
          <button
            key={n}
            type="button"
            onMouseEnter={() => setHover(n)}
            onClick={() => onChange(n)}
            aria-label={`${n} sao`}
            className={`material-symbols-outlined ${size} transition-transform hover:scale-110 ${
              filled ? 'text-secondary' : 'text-outline-variant'
            }`}
            style={{ fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0" }}
          >
            star
          </button>
        );
      })}
    </div>
  );
};

const AspectRow = ({ label, value, onChange }) => (
  <div className="flex items-center justify-between py-3 border-b border-outline-variant/20 last:border-0">
    <p className="font-body-md text-on-surface-variant">{label}</p>
    <StarRow value={value} onChange={onChange} size="text-[20px]" />
  </div>
);

const DanhGia = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [overall, setOverall] = useState(0);
  const [aspects, setAspects] = useState({ cleanliness: 0, service: 0, location: 0, value: 0 });
  const [displayName, setDisplayName] = useState('');
  const [comment, setComment] = useState('');
  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleAspectChange = (key, val) => {
    setAspects((prev) => ({ ...prev, [key]: val }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 6 - images.length);
    const readers = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((results) => {
      setImages((prev) => [...prev, ...results].slice(0, 6));
    });
  };

  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = () => {
    if (overall === 0) {
      setError('Vui lòng chọn số sao đánh giá tổng thể.');
      return;
    }
    if (comment.trim().length < 10) {
      setError('Vui lòng chia sẻ cảm nhận của bạn (tối thiểu 10 ký tự).');
      return;
    }
    setError('');

    const now = new Date();
    const reviewData = {
      bookingId: id || booking.id,
      overall,
      aspects,
      comment: comment.trim(),
      images,
      createdAt: now.toISOString(),
    };

    try {
      // 1) Lưu chi tiết đánh giá gắn với đặt phòng này (hiển thị ở ChiTietLS.jsx)
      localStorage.setItem(`review_${id || booking.id}`, JSON.stringify(reviewData));

      // 2) Thêm vào danh sách đánh giá của homestay tương ứng (hiển thị ở CTHomestay.jsx)
      const homestayKey = `reviews_${booking.homestayId}`;
      const existing = JSON.parse(localStorage.getItem(homestayKey) || '[]');
      const homestayReview = {
        name: displayName.trim() || 'Khách Luxestay',
        date: now.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' }),
        text: comment.trim(),
        rating: overall,
        bookingId: id || booking.id,
        createdAt: now.toISOString(),
      };
      localStorage.setItem(homestayKey, JSON.stringify([homestayReview, ...existing]));
    } catch (e) {
      console.error('Không thể lưu đánh giá:', e);
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="pt-40 pb-section-gap max-w-2xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <span className="material-symbols-outlined text-[64px] text-secondary mb-4">task_alt</span>
        <h1 className="font-display-md text-display-md text-primary mb-3">Cảm ơn bạn đã đánh giá!</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">
          Đánh giá của bạn về <span className="font-semibold text-primary">{booking.name}</span> đã được ghi nhận
          và sẽ giúp ích cho những lữ khách khác.
        </p>
        <button
          onClick={() => navigate('/lich-su')}
          className="px-8 py-3 bg-primary text-on-primary rounded font-label-md hover:bg-primary/90 transition-all"
        >
          Quay lại lịch sử đặt phòng
        </button>
      </main>
    );
  }

  return (
    <main className="pt-40 pb-section-gap max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
      {/* Back link */}
      <button
        onClick={() => navigate('/lich-su')}
        className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-all mb-6 font-label-md"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Quay lại lịch sử đặt phòng
      </button>

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="font-display-lg text-display-lg text-primary mb-3">Viết đánh giá</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Chuyến đi của bạn thế nào? Hãy chia sẻ trải nghiệm để giúp những lữ khách khác.
        </p>
      </div>

      {/* Booking summary card */}
      <div className="flex items-center gap-5 bg-white luxury-shadow rounded-xl border border-outline-variant/10 p-5 mb-10">
        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <img alt={booking.name} src={booking.image} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-headline-md text-headline-md text-primary mb-1">{booking.name}</h3>
          <p className="font-body-md text-on-surface-variant flex items-center gap-1 mb-1">
            <span className="material-symbols-outlined text-[16px]">location_on</span>
            {booking.location}
          </p>
          <p className="text-[12px] text-on-surface-variant uppercase tracking-wide">
            {booking.checkIn} — {booking.checkOut} &middot; Mã đặt phòng {id || booking.id}
          </p>
        </div>
      </div>

      {/* Overall rating */}
      <section className="bg-white luxury-shadow rounded-xl border border-outline-variant/10 p-8 mb-8 text-center">
        <p className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-4">
          Đánh giá tổng thể
        </p>
        <div className="flex justify-center mb-3">
          <StarRow value={overall} onChange={setOverall} />
        </div>
        <p className="font-headline-md text-headline-md text-secondary h-8">
          {RATING_LABELS[overall]}
        </p>
      </section>

      {/* Aspect ratings */}
      <section className="bg-white luxury-shadow rounded-xl border border-outline-variant/10 p-8 mb-8">
        <p className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-2">
          Chi tiết trải nghiệm
        </p>
        {ASPECTS.map((a) => (
          <AspectRow
            key={a.key}
            label={a.label}
            value={aspects[a.key]}
            onChange={(v) => handleAspectChange(a.key, v)}
          />
        ))}
      </section>

      {/* Display name */}
      <section className="bg-white luxury-shadow rounded-xl border border-outline-variant/10 p-8 mb-8">
        <label htmlFor="displayName" className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-3 block">
          Tên hiển thị (tùy chọn)
        </label>
        <input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Khách Luxestay"
          maxLength={50}
          className="w-full border border-outline-variant/40 rounded-lg p-3 font-body-md text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
        />
      </section>

      {/* Comment */}
      <section className="bg-white luxury-shadow rounded-xl border border-outline-variant/10 p-8 mb-8">
        <label htmlFor="comment" className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-3 block">
          Cảm nhận của bạn
        </label>
        <textarea
          id="comment"
          rows={6}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Điều gì khiến chuyến đi của bạn đáng nhớ? Hãy kể về không gian, dịch vụ, hoặc trải nghiệm xung quanh..."
          className="w-full border border-outline-variant/40 rounded-lg p-4 font-body-md text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary resize-none"
        />
        <p className="text-[12px] text-on-surface-variant mt-2 text-right">{comment.length}/1000</p>
      </section>

      {/* Image upload */}
      <section className="bg-white luxury-shadow rounded-xl border border-outline-variant/10 p-8 mb-8">
        <p className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-3">
          Thêm hình ảnh (tùy chọn)
        </p>
        <div className="flex flex-wrap gap-4">
          {images.map((src, idx) => (
            <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden group">
              <img src={src} alt={`upload-${idx}`} className="w-full h-full object-cover" />
              <button
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Xóa ảnh"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            </div>
          ))}
          {images.length < 6 && (
            <label className="w-24 h-24 rounded-lg border-2 border-dashed border-outline-variant/50 flex flex-col items-center justify-center cursor-pointer hover:border-secondary hover:text-secondary text-on-surface-variant transition-all">
              <span className="material-symbols-outlined text-[24px]">add_a_photo</span>
              <span className="text-[11px] mt-1">Thêm ảnh</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
            </label>
          )}
        </div>
      </section>

      {error && (
        <div className="mb-6 p-4 border border-error/20 bg-error-container/10 rounded-lg">
          <p className="font-body-md text-error">{error}</p>
        </div>
      )}

      {/* Submit */}
      <div className="flex flex-wrap gap-4 justify-end">
        <button
          onClick={() => navigate('/lich-su')}
          className="px-6 py-3 border-[1.5px] border-outline text-on-surface-variant rounded font-label-md hover:bg-surface-variant/50 transition-all"
        >
          Hủy
        </button>
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-primary text-on-primary rounded font-label-md hover:bg-primary/90 transition-all"
        >
          Gửi đánh giá
        </button>
      </div>
    </main>
  );
};

export default DanhGia;
