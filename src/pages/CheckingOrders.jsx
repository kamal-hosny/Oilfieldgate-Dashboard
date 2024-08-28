import React from 'react';
import Avatar from 'react-avatar';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import InformationAbouTheRequest from '../components/CheckingOrders/InformationAbouTheRequest';
import CustomerData from '../components/CheckingOrders/CustomerData';
import InformationHeader from '../components/CheckingOrders/InformationHeader';

const data = [
  {
    id: 1,
    name: 'Kamal',
    status: 'quoted',
    date: '12/12/2022',
    time: '1:52 AM',
    img: 'https://i.pinimg.com/236x/e0/34/10/e034101d05b985b662de77ccb6e05ea4.jpg',
  },
  {
    id: 2,
    name: 'Sara',
    status: 'sent',
    date: '14/01/2023',
    time: '3:45 PM',
    img: 'https://i.pinimg.com/236x/a7/20/45/a7204513b233e54c73068fb1205e1f4e.jpg',
  },
  {
    id: 3,
    name: 'Ahmed',
    status: 'approved',
    date: '25/02/2023',
    time: '11:22 AM',
    img: 'https://i.pinimg.com/236x/f7/9c/7f/f79c7ff7e9d3e6bfadba47c4c9b9f4c4.jpg',
  },
  {
    id: 4,
    name: 'Omar',
    status: 'on-hold',
    date: '03/03/2023',
    time: '9:17 AM',
    img: 'https://i.pinimg.com/236x/b8/2e/a5/b82ea556d2a1e4b2e678b07b4f4c8e5e.jpg',
  },
  {
    id: 5,
    name: 'Omar',
    status: 'rejected',
    date: '15/04/2023',
    time: '7:00 PM',
    img: 'https://i.pinimg.com/236x/c5/45/23/c54523e7f8b7e5e5d7088385b4c5c1e9.jpg',
  },
  {
    id: 6,
    name: 'Aya',
    status: 'sent',
    date: '20/05/2023',
    time: '2:34 AM',
    img: 'https://i.pinimg.com/236x/d1/73/12/d17312ecfd84925cfef7adbe4a9a8a3d.jpg',
  },
  {
    id: 7,
    name: 'Youssef',
    status: 'sent',
    date: '30/06/2023',
    time: '6:15 AM',
    img: 'https://i.pinimg.com/236x/e4/76/1b/e4761b9f96e7f3c57d78c72c4e3c8c65.jpg',
  },
  {
    id: 8,
    name: 'Fatima',
    status: 'sent',
    date: '12/07/2023',
    time: '5:50 PM',
    img: 'https://i.pinimg.com/236x/f5/60/87/f560875e98560f9086b345f2e8a1bc5b.jpg',
  },
  {
    id: 9,
    name: 'Hassan',
    status: 'sent',
    date: '18/08/2023',
    time: '8:23 AM',
    img: 'https://i.pinimg.com/236x/g3/80/64/g380641acb9a6d5245c7c4bfe2bbf939.jpg',
  },
  {
    id: 10,
    name: 'Nour',
    status: '',
    date: '10/09/2023',
    time: '4:40 PM',
    img: 'https://i.pinimg.com/236x/h6/90/32/h69032eafe653e98ff5786d19f8e0b93.jpg',
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'quoted':
      return '#f97316';
    case 'sent':
      return '#3b82f6';
    case 'approved':
      return '#22c55e';
    case 'on-hold':
      return '#eab308';
    case 'rejected':
      return '#ef4444'; // Updated to a red color for rejection.
    default:
      return ''; // Grey for undefined statuses.
  }
}

const CheckingOrders = () => {
  return (
    <div className="flex gap-2">
      
      <div className="orders flex-1 bg-sectionColor py-2 px-2">
        <div className="cards flex flex-col gap-2 overflow-y-auto h-screen">
          {data.map((user) => (
            <div
              key={user.id}
              className="card flex items-center p-2 gap-2 h-28 bg-sectionColorFocus hover:bg-sectionColorHover cursor-pointer border border-colorBorder"
            >
              <Avatar size='35px' name={user.name} round={true} textSizeRatio={2} />
              <div className="info text-xs relative w-full">
                <div className="name flex flex-col">
                  <span className='font-semibold text-colorText1'>
                  {user.name}
                  </span>
                  <span className='text-colorText2'>
                    co campany
                  </span>
                </div>
                <div className="time text-colorText2 absolute right-0 text-xs">
                  {user.time}
                </div>
                <span 
                  className="status h-2 w-2 absolute right-0 top-0 rounded-full" 
                  style={{backgroundColor:getStatusColor(user.status) }} 
                  data-tooltip-id={`status-tooltip-${user.id}`}
                  data-tooltip-content={user.status }>
                </span>
              </div>
              <ReactTooltip 
                id={`status-tooltip-${user.id}`} 
                place="top" 
                effect="solid"
                style={{backgroundColor:getStatusColor(user.status)}}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='details flex-[1] md:flex-[4] ld:flex-[1] sm:flex-[2] overflow-x-auto'>
          <InformationHeader />
          <div className='p-4  bg-sectionColor h-full'>
          <InformationAbouTheRequest />
          </div>
      </div>
    </div>
  );
};

export default CheckingOrders;
