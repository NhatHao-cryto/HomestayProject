import  { useState } from 'react';

// ─── Mock Data ───────────────────────────────────────────────
const HOMESTAYS = [
  { id: 1, name: 'Villa Sương Mù Sapa', location: 'Sapa, Lào Cai', price: 2800000, status: 'active', rating: 4.9, bookings: 34, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoa3w0Mq3-OgC4Wir_zhgxbmS-L2lhzx-pkBuyo9D5VMmMfTGqhUnO8RsXGMxpIgaw5rKatfueyki3B9EZxvQ-HJpMSuxHDojSW8LJeMd1b_0TEiE9sCCupOB995n4rKVSAR0tCxrBpvoAuDAsUIqGOGuvhCnwg4TR09wHicJ4jtm4UuTG1l9IEdGYbr7Dbg9V8hzQbsUywmKmSDliYMxKZ2t2gn9FCxqUHURg1iYDdobQ113vM8277JNdntELxBMGOx4i7k_YN4A' },
  { id: 2, name: 'Phố Cổ Boutique Hội An', location: 'Hội An, Quảng Nam', price: 1950000, status: 'active', rating: 4.7, bookings: 27, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFlmB8P6nnSkwzL0IoCjE-CXJoH-EwjEDmfTFP_r_sxPIBnq02wU65wXeEoG3W7vTtewtG_LKHCyOgCiNpl_vW4pcaE2kgtfnOLYAXxevr7WHSUqzKdC4CivATXrlv3INeNJPig4hzzxIBhY6SRELiELul1lO7Dn4w_97KgWjkeZwzV1eAGJk9OMHAkv4aExe_m6ozqr2MVlr68Xbot4S5XlWj0wnbG5L6wVmVW6BAGHZRAuoV2kwyD1f-hQCnivYGn0C1Ds7ajbY' },
  { id: 3, name: 'Beachfront Da Nang Pearl', location: 'Đà Nẵng', price: 3200000, status: 'maintenance', rating: 4.8, bookings: 19, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoa3w0Mq3-OgC4Wir_zhgxbmS-L2lhzx-pkBuyo9D5VMmMfTGqhUnO8RsXGMxpIgaw5rKatfueyki3B9EZxvQ-HJpMSuxHDojSW8LJeMd1b_0TEiE9sCCupOB995n4rKVSAR0tCxrBpvoAuDAsUIqGOGuvhCnwg4TR09wHicJ4jtm4UuTG1l9IEdGYbr7Dbg9V8hzQbsUywmKmSDliYMxKZ2t2gn9FCxqUHURg1iYDdobQ113vM8277JNdntELxBMGOx4i7k_YN4A' },
  { id: 4, name: 'Phú Quốc Ocean View', location: 'Phú Quốc, Kiên Giang', price: 4500000, status: 'active', rating: 5.0, bookings: 41, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFlmB8P6nnSkwzL0IoCjE-CXJoH-EwjEDmfTFP_r_sxPIBnq02wU65wXeEoG3W7vTtewtG_LKHCyOgCiNpl_vW4pcaE2kgtfnOLYAXxevr7WHSUqzKdC4CivATXrlv3INeNJPig4hzzxIBhY6SRELiELul1lO7Dn4w_97KgWjkeZwzV1eAGJk9OMHAkv4aExe_m6ozqr2MVlr68Xbot4S5XlWj0wnbG5L6wVmVW6BAGHZRAuoV2kwyD1f-hQCnivYGn0C1Ds7ajbY' },
];

const ORDERS = [
  { id: 'LS-2024-001', guest: 'Nguyễn Minh Anh', homestay: 'Villa Sương Mù Sapa', checkIn: '2024-07-10', checkOut: '2024-07-14', total: 11200000, status: 'confirmed', nights: 4 },
  { id: 'LS-2024-002', guest: 'Trần Thị Bích', homestay: 'Phố Cổ Boutique Hội An', checkIn: '2024-07-12', checkOut: '2024-07-15', total: 5850000, status: 'pending', nights: 3 },
  { id: 'LS-2024-003', guest: 'Lê Văn Cường', homestay: 'Phú Quốc Ocean View', checkIn: '2024-07-08', checkOut: '2024-07-11', total: 13500000, status: 'completed', nights: 3 },
  { id: 'LS-2024-004', guest: 'Phạm Hồng Diệp', homestay: 'Villa Sương Mù Sapa', checkIn: '2024-07-18', checkOut: '2024-07-20', total: 5600000, status: 'confirmed', nights: 2 },
  { id: 'LS-2024-005', guest: 'Hoàng Đức Minh', homestay: 'Beachfront Da Nang Pearl', checkIn: '2024-07-05', checkOut: '2024-07-07', total: 6400000, status: 'cancelled', nights: 2 },
  { id: 'LS-2024-006', guest: 'Vũ Thị Lan', homestay: 'Phú Quốc Ocean View', checkIn: '2024-07-22', checkOut: '2024-07-25', total: 13500000, status: 'pending', nights: 3 },
];

// Generate calendar bookings
const CALENDAR_EVENTS = {
  '2024-07-08': [{ id: 3, name: 'Lê Văn Cường', homestay: 'Phú Quốc', type: 'checkin' }],
  '2024-07-10': [{ id: 1, name: 'Nguyễn Minh Anh', homestay: 'Sapa', type: 'checkin' }],
  '2024-07-11': [{ id: 3, name: 'Lê Văn Cường', homestay: 'Phú Quốc', type: 'checkout' }],
  '2024-07-12': [{ id: 2, name: 'Trần Thị Bích', homestay: 'Hội An', type: 'checkin' }],
  '2024-07-14': [{ id: 1, name: 'Nguyễn Minh Anh', homestay: 'Sapa', type: 'checkout' }],
  '2024-07-15': [{ id: 2, name: 'Trần Thị Bích', homestay: 'Hội An', type: 'checkout' }],
  '2024-07-18': [{ id: 4, name: 'Phạm Hồng Diệp', homestay: 'Sapa', type: 'checkin' }],
  '2024-07-20': [{ id: 4, name: 'Phạm Hồng Diệp', homestay: 'Sapa', type: 'checkout' }],
  '2024-07-22': [{ id: 6, name: 'Vũ Thị Lan', homestay: 'Phú Quốc', type: 'checkin' }],
  '2024-07-25': [{ id: 6, name: 'Vũ Thị Lan', homestay: 'Phú Quốc', type: 'checkout' }],
};

const REVENUE_DATA = [
  { month: 'T1', revenue: 48 }, { month: 'T2', revenue: 55 }, { month: 'T3', revenue: 62 },
  { month: 'T4', revenue: 71 }, { month: 'T5', revenue: 58 }, { month: 'T6', revenue: 84 },
  { month: 'T7', revenue: 96 }, { month: 'T8', revenue: 88 }, { month: 'T9', revenue: 0 },
  { month: 'T10', revenue: 0 }, { month: 'T11', revenue: 0 }, { month: 'T12', revenue: 0 },
];

const maxRevenue = Math.max(...REVENUE_DATA.map(d => d.revenue));

// ─── Helpers ──────────────────────────────────────────────────
const fmt = (n) => new Intl.NumberFormat('vi-VN').format(n);

const STATUS_CONFIG = {
  confirmed: { label: 'Đã xác nhận', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  pending:   { label: 'Chờ xác nhận', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
  completed: { label: 'Hoàn thành', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
  cancelled: { label: 'Đã huỷ', cls: 'bg-red-50 text-red-600 border-red-200' },
  active:    { label: 'Đang hoạt động', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  maintenance:{ label: 'Bảo trì', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
};

const DAYS_OF_WEEK = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

// ─── Sub-components ───────────────────────────────────────────
const StatCard = ({ icon, label, value, sub, color, trend }) => (
  <div className="glass-card rounded-2xl p-6 luxury-shadow flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-300">
    <div className="flex items-start justify-between">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <span className="material-symbols-outlined text-white text-2xl">{icon}</span>
      </div>
      {trend !== undefined && (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div>
      <p className="font-body-md text-on-surface-variant text-sm">{label}</p>
      <p className="font-headline-lg text-headline-lg text-on-surface mt-0.5">{value}</p>
      {sub && <p className="text-xs text-on-surface-variant mt-1">{sub}</p>}
    </div>
  </div>
);

const SectionTitle = ({ icon, title, action, onAction }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      <span className="material-symbols-outlined text-primary text-xl">{icon}</span>
      <h2 className="font-headline-sm text-headline-sm text-on-surface">{title}</h2>
    </div>
    {action && (
      <button onClick={onAction} className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
        <span className="material-symbols-outlined text-base">add_circle</span>
        {action}
      </button>
    )}
  </div>
);

// ─── TAB: Thống kê ─────────────────────────────────────────────
const ThongKeTab = () => (
  <div className="space-y-8">
    {/* Stat cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon="home_work" label="Homestay đang hoạt động" value="3" sub="1 đang bảo trì" color="bg-primary" trend={0} />
      <StatCard icon="receipt_long" label="Đơn đặt phòng tháng này" value="18" sub="↑ 4 so với tháng trước" color="bg-secondary" trend={28} />
      <StatCard icon="payments" label="Doanh thu tháng 7" value="₫96 tr" sub="Cao nhất từ đầu năm" color="bg-emerald-500" trend={14} />
      <StatCard icon="star" label="Đánh giá trung bình" value="4.85 ★" sub="Từ 121 đánh giá" color="bg-amber-500" trend={2} />
    </div>

    {/* Revenue chart */}
    <div className="glass-card rounded-2xl p-6 luxury-shadow">
      <SectionTitle icon="bar_chart" title="Doanh thu theo tháng (triệu VNĐ)" />
      <div className="flex items-end gap-2 h-48 px-2">
        {REVENUE_DATA.map((d) => (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
            <span className={`text-xs font-semibold ${d.revenue > 0 ? 'text-primary' : 'text-transparent'}`}>
              {d.revenue > 0 ? d.revenue : ''}
            </span>
            <div className="w-full rounded-t-lg transition-all duration-500"
              style={{
                height: d.revenue > 0 ? `${(d.revenue / maxRevenue) * 160}px` : '4px',
                background: d.revenue === maxRevenue
                  ? 'linear-gradient(180deg, #1A3A6B 0%, #2D5FAF 100%)'
                  : d.revenue > 0
                    ? 'linear-gradient(180deg, #2D5FAF66 0%, #2D5FAF33 100%)'
                    : '#e5e7eb',
              }}
            />
            <span className="text-xs text-on-surface-variant">{d.month}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Quick overview */}
    <div className="grid md:grid-cols-2 gap-4">
      <div className="glass-card rounded-2xl p-6 luxury-shadow">
        <SectionTitle icon="trending_up" title="Hiệu suất nhanh" />
        <div className="space-y-4">
          {[
            { label: 'Tỷ lệ lấp đầy phòng', val: 78, color: 'bg-primary' },
            { label: 'Tỷ lệ xác nhận đơn', val: 91, color: 'bg-emerald-500' },
            { label: 'Tỷ lệ khách quay lại', val: 43, color: 'bg-amber-500' },
          ].map(item => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-on-surface-variant">{item.label}</span>
                <span className="font-semibold text-on-surface">{item.val}%</span>
              </div>
              <div className="h-2 bg-outline-variant/30 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.val}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="glass-card rounded-2xl p-6 luxury-shadow">
        <SectionTitle icon="notifications_active" title="Hoạt động gần đây" />
        <div className="space-y-3">
          {[
            { icon: 'check_circle', text: 'Nguyễn Minh Anh đã thanh toán đơn LS-2024-001', time: '2 giờ trước', color: 'text-emerald-500' },
            { icon: 'pending', text: 'Trần Thị Bích gửi yêu cầu đặt phòng mới', time: '5 giờ trước', color: 'text-amber-500' },
            { icon: 'star', text: 'Lê Văn Cường đánh giá 5★ Phú Quốc Ocean View', time: '1 ngày trước', color: 'text-amber-400' },
            { icon: 'cancel', text: 'Hoàng Đức Minh huỷ đơn LS-2024-005', time: '2 ngày trước', color: 'text-red-400' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className={`material-symbols-outlined text-lg mt-0.5 ${item.color}`}>{item.icon}</span>
              <div>
                <p className="text-sm text-on-surface">{item.text}</p>
                <p className="text-xs text-on-surface-variant mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── TAB: Quản lý Homestay ────────────────────────────────────
const HomestayTab = () => {
  const [search, setSearch] = useState('');
  const filtered = HOMESTAYS.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">search</span>
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
            placeholder="Tìm kiếm homestay..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors luxury-shadow">
          <span className="material-symbols-outlined text-base">add</span>
          Thêm homestay
        </button>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-5">
        {filtered.map(h => (
          <div key={h.id} className="glass-card rounded-2xl overflow-hidden luxury-shadow hover:scale-[1.01] transition-transform duration-300">
            <div className="relative h-44">
              <img src={h.img} alt={h.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <span className="text-white font-semibold text-base drop-shadow">{h.name}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full border font-medium backdrop-blur-sm ${STATUS_CONFIG[h.status].cls}`}>
                  {STATUS_CONFIG[h.status].label}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-1.5 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-base">location_on</span>
                {h.location}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-primary">{fmt(h.price)} ₫<span className="font-normal text-on-surface-variant">/đêm</span></span>
                <div className="flex items-center gap-1 text-amber-500">
                  <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-semibold">{h.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
                <span className="text-xs text-on-surface-variant">{h.bookings} lượt đặt</span>
                <div className="flex gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors">
                    <span className="material-symbols-outlined text-base">edit</span>
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-600 transition-colors">
                    <span className="material-symbols-outlined text-base">visibility</span>
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── TAB: Quản lý Đơn hàng ───────────────────────────────────
const DonHangTab = () => {
  const [filter, setFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'Tất cả' },
    { key: 'pending', label: 'Chờ duyệt' },
    { key: 'confirmed', label: 'Đã xác nhận' },
    { key: 'completed', label: 'Hoàn thành' },
    { key: 'cancelled', label: 'Đã huỷ' },
  ];

  const filtered = filter === 'all' ? ORDERS : ORDERS.filter(o => o.status === filter);

  return (
    <div className="space-y-5">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === f.key
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface border border-outline-variant/40 text-on-surface-variant hover:border-primary/40'
            }`}
          >
            {f.label}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${filter === f.key ? 'bg-white/20' : 'bg-outline-variant/30'}`}>
              {f.key === 'all' ? ORDERS.length : ORDERS.filter(o => o.status === f.key).length}
            </span>
          </button>
        ))}
      </div>

      {/* Orders */}
      <div className="space-y-3">
        {filtered.map(order => (
          <div key={order.id} className="glass-card rounded-xl p-4 luxury-shadow hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-lg">receipt_long</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-on-surface">{order.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_CONFIG[order.status].cls}`}>
                      {STATUS_CONFIG[order.status].label}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant mt-0.5">{order.guest} · {order.homestay}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    {order.checkIn} → {order.checkOut} ({order.nights} đêm)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-primary">{fmt(order.total)} ₫</p>
                  <p className="text-xs text-on-surface-variant">{fmt(order.total / order.nights)} ₫/đêm</p>
                </div>
                <div className="flex gap-1.5">
                  {order.status === 'pending' && (
                    <>
                      <button className="px-3 py-1.5 bg-emerald-500 text-white text-xs rounded-lg hover:bg-emerald-600 transition-colors font-medium">
                        Duyệt
                      </button>
                      <button className="px-3 py-1.5 bg-red-50 text-red-600 text-xs rounded-lg hover:bg-red-100 transition-colors font-medium">
                        Từ chối
                      </button>
                    </>
                  )}
                  <button className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors">
                    <span className="material-symbols-outlined text-base">open_in_new</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── TAB: Quản lý Lịch ───────────────────────────────────────
const LichTab = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 6, 1)); // July 2024
  const [selectedDay, setSelectedDay] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthName = currentDate.toLocaleString('vi-VN', { month: 'long', year: 'numeric' });

  const dayKey = (d) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const events = (d) => CALENDAR_EVENTS[dayKey(d)] || [];

  const selectedEvents = selectedDay ? events(selectedDay) : [];

  return (
    <div className="space-y-5">
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Calendar */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-5 luxury-shadow">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <button onClick={prevMonth} className="w-9 h-9 rounded-xl hover:bg-primary/10 flex items-center justify-center text-primary transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <h3 className="font-semibold text-on-surface capitalize">{monthName}</h3>
            <button onClick={nextMonth} className="w-9 h-9 rounded-xl hover:bg-primary/10 flex items-center justify-center text-primary transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS_OF_WEEK.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-on-surface-variant py-1">{d}</div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const d = i + 1;
              const evs = events(d);
              const hasCheckin = evs.some(e => e.type === 'checkin');
              const hasCheckout = evs.some(e => e.type === 'checkout');
              const isSelected = selectedDay === d;// visual mark

              return (
                <button
                  key={d}
                  onClick={() => setSelectedDay(isSelected ? null : d)}
                  className={`relative aspect-square rounded-xl flex flex-col items-center justify-center text-sm transition-all
                    ${isSelected ? 'bg-primary text-white shadow-md scale-105' : 'hover:bg-primary/10 text-on-surface'}
                    ${evs.length > 0 ? 'font-semibold' : ''}
                  `}
                >
                  <span>{d}</span>
                  {evs.length > 0 && (
                    <div className="flex gap-0.5 mt-0.5">
                      {hasCheckin && <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-emerald-300' : 'bg-emerald-500'}`} />}
                      {hasCheckout && <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-200' : 'bg-amber-500'}`} />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-outline-variant/20">
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Check-in
            </div>
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Check-out
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Selected day detail */}
          <div className="glass-card rounded-2xl p-5 luxury-shadow">
            <h3 className="font-semibold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">event</span>
              {selectedDay ? `Ngày ${selectedDay} tháng ${month + 1}` : 'Chọn ngày để xem'}
            </h3>
            {selectedDay ? (
              selectedEvents.length > 0 ? (
                <div className="space-y-3">
                  {selectedEvents.map((ev, i) => (
                    <div key={i} className={`rounded-xl p-3 flex items-start gap-3 ${ev.type === 'checkin' ? 'bg-emerald-50' : 'bg-amber-50'}`}>
                      <span className={`material-symbols-outlined text-lg mt-0.5 ${ev.type === 'checkin' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {ev.type === 'checkin' ? 'login' : 'logout'}
                      </span>
                      <div>
                        <p className={`text-xs font-semibold ${ev.type === 'checkin' ? 'text-emerald-700' : 'text-amber-700'}`}>
                          {ev.type === 'checkin' ? 'Check-in' : 'Check-out'}
                        </p>
                        <p className="text-sm font-medium text-on-surface">{ev.name}</p>
                        <p className="text-xs text-on-surface-variant">{ev.homestay}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <span className="material-symbols-outlined text-4xl text-outline-variant/50">event_available</span>
                  <p className="text-sm text-on-surface-variant mt-2">Không có sự kiện</p>
                </div>
              )
            ) : (
              <p className="text-sm text-on-surface-variant">Nhấn vào một ngày để xem lịch đặt phòng.</p>
            )}
          </div>

          {/* Upcoming */}
          <div className="glass-card rounded-2xl p-5 luxury-shadow">
            <h3 className="font-semibold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">upcoming</span>
              Sắp tới
            </h3>
            <div className="space-y-2">
              {[
                { date: '10/7', name: 'N. Minh Anh', type: 'checkin', place: 'Sapa' },
                { date: '12/7', name: 'T. Thị Bích', type: 'checkin', place: 'Hội An' },
                { date: '14/7', name: 'N. Minh Anh', type: 'checkout', place: 'Sapa' },
                { date: '18/7', name: 'P. Hồng Diệp', type: 'checkin', place: 'Sapa' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm">
                  <span className="text-xs font-bold text-primary w-10 shrink-0">{item.date}</span>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.type === 'checkin' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className="text-on-surface truncate">{item.name}</span>
                  <span className="text-on-surface-variant text-xs shrink-0">· {item.place}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────
const TABS = [
  { key: 'thongke', label: 'Thống kê', icon: 'bar_chart_4_bars' },
  { key: 'homestay', label: 'Homestay', icon: 'home_work' },
  { key: 'donhang', label: 'Đơn hàng', icon: 'receipt_long' },
  { key: 'lich', label: 'Lịch', icon: 'calendar_month' },
];

const QuanLy = () => {
  const [activeTab, setActiveTab] = useState('thongke');

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-surface via-surface to-primary/5">
      <div className="max-w-container-max mx-auto px-margin-desktop py-8">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-on-surface-variant font-medium mb-1">Xin chào, Chủ sở hữu 👋</p>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Trung tâm quản lý</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-outline-variant/40 text-sm text-on-surface-variant hover:border-primary/40 transition-colors">
              <span className="material-symbols-outlined text-base">file_download</span>
              Xuất báo cáo
            </button>
            <button className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors relative">
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-white text-xs rounded-full flex items-center justify-center font-bold">2</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface border border-outline-variant/30 rounded-2xl p-1.5 mb-8 luxury-shadow w-fit">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40'
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="animate-fadeIn">
          {activeTab === 'thongke' && <ThongKeTab />}
          {activeTab === 'homestay' && <HomestayTab />}
          {activeTab === 'donhang' && <DonHangTab />}
          {activeTab === 'lich' && <LichTab />}
        </div>
      </div>
    </div>
  );
};

export default QuanLy;
