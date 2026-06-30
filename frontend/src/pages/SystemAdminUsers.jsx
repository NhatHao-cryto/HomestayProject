import React, { useMemo, useState } from 'react';

const initialUsers = [
  {
    id: 1,
    fullName: 'Nguyễn Minh Anh',
    username: 'anh',
    email: 'anh@example.com',
    phone: '0909123456',
    role: 'CUSTOMER',
    status: 'ACTIVE',
  },
  {
    id: 2,
    fullName: 'Trần Đức Huy',
    username: 'huy',
    email: 'huy@example.com',
    phone: '0911223344',
    role: 'HOST_ADMIN',
    status: 'ACTIVE',
  },
  {
    id: 3,
    fullName: 'Lê Thị Mai',
    username: 'mai',
    email: 'mai@example.com',
    phone: '0988776655',
    role: 'CUSTOMER',
    status: 'LOCKED',
  },
];

const SystemAdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      `${user.fullName} ${user.email} ${user.username}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, users]);

  const toggleStatus = (id) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE',
            }
          : user
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <h1 className="text-2xl font-semibold text-slate-900">
          Quản lý người dùng
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Quản lý người thuê và host admin.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <input
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
          placeholder="Tìm kiếm người dùng"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="py-3 pr-4">Tên</th>
                <th className="py-3 pr-4">Username</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4">Số điện thoại</th>
                <th className="py-3 pr-4">Vai trò</th>
                <th className="py-3 pr-4">Trạng thái</th>
                <th className="py-3">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-100">
                  <td className="py-3 pr-4 font-medium text-slate-900">
                    {user.fullName}
                  </td>

                  <td className="py-3 pr-4">{user.username}</td>

                  <td className="py-3 pr-4">{user.email}</td>

                  <td className="py-3 pr-4">{user.phone}</td>

                  <td className="py-3 pr-4">{user.role}</td>

                  <td className="py-3 pr-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                      {user.status}
                    </span>
                  </td>

                  <td className="py-3">
                    <button
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      onClick={() => toggleStatus(user.id)}
                    >
                      {user.status === 'ACTIVE' ? 'Khoá' : 'Mở khoá'}
                    </button>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-6 text-center text-slate-500">
                    Không tìm thấy người dùng.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SystemAdminUsers;