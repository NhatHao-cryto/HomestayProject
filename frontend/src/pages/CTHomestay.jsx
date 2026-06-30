import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from "../js/api";

const CTHomestay = () => {

  const fetchHomestay = async () => {

    try {
      setLoading(true);
      const response = await api.get(`/homestay/homestays/${id}`);
      setData(response.data.result);

    } catch (error) {
      console.error(error);
      setError("Không thể tải thông tin homestay");

    } finally {
      setLoading(false);
    }

  };

  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const today = new Date();
    const inDate = new Date(today);
    inDate.setDate(today.getDate() + 7);
    const outDate = new Date(inDate);
    outDate.setDate(inDate.getDate() + 2);
    setCheckIn(inDate.toISOString().split('T')[0]);
    setCheckOut(outDate.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    fetchHomestay();
  }, [id]);
  if (loading) {
    return (
      <main className="pt-32 pb-section-gap text-center">
        <p className="text-on-surface-variant">Đang tải thông tin homestay...</p>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="pt-32 pb-section-gap text-center">
        <p className="text-red-600">{error || 'Không tìm thấy homestay'}</p>
        <Link to="/homestays" className="text-primary underline mt-4 inline-block">Quay lại danh sách</Link>
      </main>
    );
  }

  const nights = checkIn && checkOut
    ? Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))
    : 2;
  const roomTotal = data.price * nights;
  const serviceFee = 0;
  const totalAmount = roomTotal + serviceFee;
  `${checkIn.split('-').reverse().join('/')} - ${checkOut.split('-').reverse().join('/')}`;
  const images =
      data?.images && data.images.length > 0
          ? data.images
          : data?.image
              ? [data.image]
              : [];

  const handleBooking = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Vui lòng đăng nhập.");
      navigate("/dang-nhap");
      return;

    }
    if (!checkIn || !checkOut) {
      alert("Vui lòng chọn ngày.");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Ngày trả phòng phải sau ngày nhận.");
      return;

    }

    try {
      setSubmitting(true);
      await api.post("/homestay/bookings", {
        homestayId: data.id,
        checkIn,
        checkOut,
        adultCount,
        childCount
      });
      alert("Đặt phòng thành công!");

      navigate("/lich-su-dat-phong");

    } catch (error) {

      console.error(error);

      alert("Đặt phòng thất bại.");

    } finally {

      setSubmitting(false);

    }

  };

  return (
    <main className="pt-24 pb-section-gap">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <nav className="flex items-center gap-2 text-label-md font-label-md text-on-surface-variant mb-6 pt-4">
          <Link to="/" className="hover:text-primary">Trang chủ</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <Link to="/homestays" className="hover:text-primary">Homestay</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-primary font-bold">{data.name}</span>
        </nav>

        <section className="grid grid-cols-4 grid-rows-2 gap-4 h-[600px] mb-12">
          <div className="col-span-2 row-span-2 relative overflow-hidden rounded-xl">
            <img alt={data.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" src={images[0]} />
          </div>
          {images.slice(1, 4).map((img, idx) => (
            <div key={idx} className={`overflow-hidden rounded-xl ${idx === 2 ? 'col-span-2 relative' : 'col-span-1'}`}>
              <img alt="Homestay" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" src={img} />
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-md text-label-md">Luxestay Exclusive</span>
                <div className="flex items-center text-secondary">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="font-label-md text-label-md ml-1">{(data.stars ?? 0).toFixed(1)}</span>
                  <span className="text-on-surface-variant ml-1 font-body-md">({data.reviewsCount ?? 0} đánh giá)</span>
                </div>
              </div>
              <h1 className="font-display-lg text-display-lg text-primary mb-2">{data.name}</h1>
              <div className="flex items-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px] mr-1">location_on</span>
                <span className="font-body-lg text-body-lg">{data.location}</span>
              </div>
            </div>

            <div className="w-full h-px bg-outline-variant/30 mb-10"></div>

            <section className="mb-12">
              <h2 className="font-headline-md text-headline-md text-primary mb-6">Giới thiệu</h2>
              <div className="font-body-lg text-body-lg text-on-surface-variant space-y-4 leading-relaxed">
                <p>{data.description}</p>
                {data.descriptionExtended && <p>{data.descriptionExtended}</p>}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-headline-md text-headline-md text-primary mb-6">Tiện nghi cao cấp</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                {(data.amenities ?? []).map((amenity, i) => {
                  let icon = 'check_circle';
                  if (amenity.includes('Wifi') || amenity.includes('wifi')) icon = 'wifi';
                  else if (amenity.includes('bơi')) icon = 'pool';
                  else if (amenity.includes('BBQ')) icon = 'outdoor_grill';
                  else if (amenity.includes('Bếp')) icon = 'kitchen';
                  else if (amenity.includes('đậu xe')) icon = 'local_parking';
                  else if (amenity.includes('hòa')) icon = 'ac_unit';
                  else if (amenity.includes('Spa')) icon = 'spa';
                  return (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">{icon}</span>
                      </div>
                      <span className="font-body-md text-body-md">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-headline-md text-headline-md text-primary mb-6">Vị trí</h2>
              <div className="mt-4 p-6 bg-surface-container-low rounded-xl flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary">info</span>
                <p className="font-body-md text-body-md text-on-surface-variant">{data.address}</p>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-surface border border-outline-variant/50 p-8 rounded-2xl custom-shadow">
              <div className="flex items-baseline gap-1 mb-8">
                <span className="font-headline-lg text-headline-lg text-primary">{(data.price ?? 0).toLocaleString("vi-VN")} VNĐ</span>
                <span className="font-body-md text-body-md text-on-surface-variant">/ Đêm</span>
              </div>
              <div className="space-y-4 mb-8">
                <div className="border border-outline rounded-xl p-4 bg-white">
                  <label className="block text-[12px] font-bold text-on-surface-variant uppercase mb-1">Nhận phòng</label>
                  <input type="date" className="font-body-md text-body-md w-full bg-transparent border-none p-0 focus:ring-0" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                </div>
                <div className="border border-outline rounded-xl p-4 bg-white">
                  <label className="block text-[12px] font-bold text-on-surface-variant uppercase mb-1">Trả phòng</label>
                  <input type="date" className="font-body-md text-body-md w-full bg-transparent border-none p-0 focus:ring-0" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                </div>
                <div className="border border-outline rounded-xl p-4 bg-white grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-on-surface-variant uppercase mb-1">Người lớn</label>
                    <input type="number" min="1" className="font-body-md w-full" value={adultCount} onChange={(e) => setAdultCount(Number(e.target.value))} />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-on-surface-variant uppercase mb-1">Trẻ em</label>
                    <input type="number" min="0" className="font-body-md w-full" value={childCount} onChange={(e) => setChildCount(Number(e.target.value))} />
                  </div>
                </div>
              </div>
              <button
                onClick={handleBooking}
                disabled={submitting}
                className="w-full bg-primary text-on-primary py-4 rounded-xl font-headline-md text-headline-md hover:opacity-90 transition-all active:scale-[0.98] mb-4 text-white disabled:opacity-60"
              >
                {submitting ? 'Đang xử lý...' : 'Đặt ngay'}
              </button>
              <p className="text-center text-[12px] text-on-surface-variant">Bạn chưa bị trừ tiền ngay lúc này</p>
              <div className="mt-8 pt-8 border-t border-outline-variant/30 space-y-4">
                <div className="flex justify-between font-body-md text-body-md">
                  <span className="text-on-surface-variant">{(data.price ?? 0).toLocaleString("vi-VN")} VNĐ x {nights} đêm</span>
                  <span className="text-primary font-medium">{roomTotal.toLocaleString('vi-VN')} VNĐ</span>
                </div>
                <div className="flex justify-between font-body-md text-body-md">
                  <span className="text-on-surface-variant">Phí dịch vụ</span>
                  <span className="text-primary font-medium">{serviceFee.toLocaleString('vi-VN')} VNĐ</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-outline-variant/30">
                  <span className="font-headline-md text-headline-md text-primary">Tổng cộng</span>
                  <span className="font-headline-md text-headline-md text-primary">{totalAmount.toLocaleString('vi-VN')} VNĐ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CTHomestay;
