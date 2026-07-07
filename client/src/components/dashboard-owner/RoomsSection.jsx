import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import {
  BedDouble,
  Users,
  Maximize,
  IndianRupee,
  Pencil,
  MoreVertical,
  Plus,
  Home
} from 'lucide-react';

const initialRooms = [
  {
    id: 1,
    name: 'Deluxe King Room',
    type: 'Deluxe',
    price: 4200,
    capacity: 2,
    size: 320,
    status: 'active',
    totalUnits: 5,
    bookedUnits: 3
  },
  {
    id: 2,
    name: 'Garden View Twin',
    type: 'Standard',
    price: 2800,
    capacity: 2,
    size: 260,
    status: 'active',
    totalUnits: 6,
    bookedUnits: 6
  },
  {
    id: 3,
    name: 'Sunset Suite',
    type: 'Suite',
    price: 6500,
    capacity: 3,
    size: 450,
    status: 'active',
    totalUnits: 3,
    bookedUnits: 1
  },
  {
    id: 4,
    name: 'Courtyard Single',
    type: 'Standard',
    price: 2100,
    capacity: 1,
    size: 200,
    status: 'inactive',
    totalUnits: 4,
    bookedUnits: 0
  },
  {
    id: 5,
    name: 'Family Cottage',
    type: 'Cottage',
    price: 7800,
    capacity: 5,
    size: 620,
    status: 'active',
    totalUnits: 2,
    bookedUnits: 2
  },
  {
    id: 6,
    name: 'Rooftop Room',
    type: 'Premium',
    price: 5400,
    capacity: 2,
    size: 340,
    status: 'maintenance',
    totalUnits: 2,
    bookedUnits: 0
  }
];


const statusStyles = {
  active: { label: 'Active', badge: 'text-emerald-700 bg-emerald-50' },
  inactive: { label: 'Inactive', badge: 'text-slate-500 bg-slate-100' },
  maintenance: { label: 'Maintenance', badge: 'text-amber-700 bg-amber-50' }
};

const RoomsSection = () => {
  const [rooms, setRooms] = useState(initialRooms);

  const toggleActive = (id) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === id
          ? { ...room, status: room.status === 'active' ? 'inactive' : 'active' }
          : room
      )
    );
  };

  return (
    <div className="font-sans">
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[17px] font-semibold text-[#0F172A] leading-none">
            Rooms
          </h2>
          <p className="text-[13px] text-slate-400 mt-1.5">
            Manage room types and availability for Sunset Villa
          </p>
        </div>
        <button className="flex items-center gap-1.5 bg-[#007ACC] hover:bg-[#0069b3] text-white text-[13.5px] font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus className="w-4 h-4" strokeWidth={2} />
          Add room
        </button>
      </div>

      {/* Room cards grid */}
      {rooms.length === 0 ? (
        <div className="border border-dashed border-[#CBD5E1] rounded-2xl py-16 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-xl bg-[#007ACC]/10 flex items-center justify-center mb-4">
            <BedDouble className="w-6 h-6 text-[#007ACC]" strokeWidth={1.75} />
          </div>
          <h3 className="text-[15px] font-semibold text-[#0F172A] mb-1.5">
            No rooms yet
          </h3>
          <p className="text-[13px] text-slate-400 mb-5 max-w-xs">
            Add your first room type to start accepting bookings for this property.
          </p>
          <button className="flex items-center gap-1.5 bg-[#007ACC] hover:bg-[#0069b3] text-white text-[13.5px] font-semibold px-4 py-2.5 rounded-xl transition-colors">
            <Plus className="w-4 h-4" strokeWidth={2} />
            Add your first room
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {rooms.map((room) => {
            const style = statusStyles[room.status];
            return (
              <div
                key={room.id}
                className="group bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-[0_2px_10px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_-10px_rgba(15,23,42,0.14)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Photo placeholder */}
                <div className="relative h-40 bg-gradient-to-br from-[#EAF4FB] to-[#DCEBF5] flex items-center justify-center">
                  <BedDouble className="w-9 h-9 text-[#007ACC]/40" strokeWidth={1.5} />
                  <span className={`absolute top-3 left-3 text-[11px] font-semibold px-2 py-0.5 rounded-full ${style.badge}`}>
                    {style.label}
                  </span>
                  <button className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-white/90 hover:bg-white flex items-center justify-center transition-colors">
                    <MoreVertical className="w-4 h-4 text-slate-500" strokeWidth={2} />
                  </button>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-[14.5px] font-semibold text-[#0F172A] leading-tight">
                        {room.name}
                      </h3>
                      <p className="text-[12.5px] text-slate-400 mt-0.5">
                        {room.type}
                      </p>
                    </div>
                    <div className="flex items-center text-[15px] font-bold text-[#0F172A] flex-shrink-0">
                      <IndianRupee className="w-3.5 h-3.5 mr-0.5" strokeWidth={2.25} />
                      {room.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center gap-4 pb-4 mb-4 border-b border-[#EDF1F5]">
                    <div className="flex items-center gap-1.5 text-[12.5px] text-slate-500">
                      <Users className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.75} />
                      {room.capacity} guests
                    </div>
                    <div className="flex items-center gap-1.5 text-[12.5px] text-slate-500">
                      <Maximize className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.75} />
                      {room.size} sqft
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="pb-4 mb-4 border-b border-[#EDF1F5]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-[12.5px] text-slate-500">
                        <Home className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.75} />
                        {room.totalUnits} rooms total
                      </div>
                      <span className="text-[12.5px] font-semibold text-[#0F172A]">
                        {room.bookedUnits} booked
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          room.bookedUnits === room.totalUnits ? 'bg-red-400' : 'bg-[#007ACC]'
                        }`}
                        style={{ width: `${(room.bookedUnits / room.totalUnits) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer: edit + active toggle */}
                  <div className="flex items-center justify-between">
                    <button className="flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-500 hover:text-[#007ACC] transition-colors">
                      <Pencil className="w-3.5 h-3.5" strokeWidth={1.75} />
                      Edit
                    </button>

                    <Switch
                      checked={room.status === 'active'}
                      onCheckedChange={() => toggleActive(room.id)}
                      disabled={room.status === 'maintenance'}
                      className="data-[state=checked]:bg-[#007ACC]"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RoomsSection;