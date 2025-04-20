const CyclingData = [
  {
    day: "Sunday",
    date: "September 2, 2020",
    distance: "14,2 Km",
    time: "00:53:22",
    caloriesBurned: "350 kcal",
  },
  {
    day: "Monday",
    date: "September 3, 2020",
    distance: "14,2 Km",
    time: "00:53:22",
    caloriesBurned: "340 kcal",
  },
  {
    day: "Tuesday",
    date: "September 4, 2020",
    distance: "14,2 Km",
    time: "00:53:22",
    caloriesBurned: "330 kcal",
  },
  {
    day: "Wednesday",
    date: "September 5, 2020",
    distance: "14,2 Km",
    time: "00:53:22",
    caloriesBurned: "325 kcal",
  },
  {
    day: "Thursday",
    date: "September 8, 2020",
    distance: "14,2 Km",
    time: "00:53:22",
    caloriesBurned: "320 kcal",
  },
  {
    day: "Friday",
    date: "September 7, 2020",
    distance: "14,2 Km",
    time: "00:53:22",
    caloriesBurned: "315 kcal",
  },
  {
    day: "Saturday",
    date: "September 8, 2020",
    distance: "14,2 Km",
    time: "00:53:22",
    caloriesBurned: "310 kcal",
  },
  {
    day: "Sunday",
    date: "September 9, 2020",
    distance: "14,2 Km",
    time: "00:53:22",
    caloriesBurned: "305 kcal",
  },
  {
    day: "Monday",
    date: "September 10, 2020",
    distance: "14,2 Km",
    time: "00:53:22",
    caloriesBurned: "300 kcal",
  },
  {
    day: "Tuesday",
    date: "September 11, 2020",
    distance: "14,2 Km",
    time: "00:53:22",
    caloriesBurned: "295 kcal",
  },
];

const Cycling = () => {
  return (
    <div className="col-xl-4 col-xxl-6 col-lg-6">
      <div className="card">
        <div className="card-header bg-info">
          <div className="d-flex me-3 align-items-center">
            <span className="p-3 me-3 rounded-circle bg-white">
              <svg
                width={32}
                height={32}
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5732 6.5325L7.33902 13.1929C6.88447 13.8557 7.05492 14.7585 7.71465 15.2099L13.9931 19.5123V23.6948C13.9931 24.4902 14.6244 25.1563 15.4198 25.1721C16.2342 25.1846 16.8971 24.5312 16.8971 23.72V18.7516C16.8971 18.2718 16.6604 17.8236 16.2658 17.5553L12.238 14.7933L15.6282 11.198L17.3643 15.1531C17.5947 15.6803 18.1187 16.0212 18.6932 16.0212H23.9805C24.7759 16.0212 25.442 15.3899 25.4577 14.5944C25.4704 13.78 24.817 13.1171 24.0057 13.1171H19.6465C19.072 11.8103 18.4596 10.5161 17.9262 9.19036C17.6547 8.52117 17.5032 8.23077 17.0044 7.76991C16.9034 7.67521 16.1995 7.03127 15.5714 6.45678C14.9937 5.93276 14.1035 5.96748 13.5732 6.5325Z"
                  fill="#1EA7C5"
                />
                <path
                  d="M19.5202 7.25853C21.3577 7.25853 22.8472 5.76898 22.8472 3.93151C22.8472 2.09405 21.3577 0.604492 19.5202 0.604492C17.6827 0.604492 16.1932 2.09405 16.1932 3.93151C16.1932 5.76898 17.6827 7.25853 19.5202 7.25853Z"
                  fill="#1EA7C5"
                />
                <path
                  d="M6.12374 29.3955C9.50578 29.3955 12.2475 26.6538 12.2475 23.2718C12.2475 19.8897 9.50578 17.1481 6.12374 17.1481C2.74169 17.1481 0 19.8897 0 23.2718C0 26.6538 2.74169 29.3955 6.12374 29.3955Z"
                  fill="#1EA7C5"
                />
                <path
                  d="M23.8763 29.3955C27.2583 29.3955 30 26.6538 30 23.2718C30 19.8897 27.2583 17.1481 23.8763 17.1481C20.4942 17.1481 17.7525 19.8897 17.7525 23.2718C17.7525 26.6538 20.4942 29.3955 23.8763 29.3955Z"
                  fill="#1EA7C5"
                />
              </svg>
            </span>
            <h4 className="fs-20 text-white mb-0">Cycling</h4>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table shadow-hover">
              <thead>
                <tr>
                  <th>
                    <span className="font-w600 text-black fs-16">Date</span>
                  </th>
                  <th>
                    <span className="font-w600 text-black fs-16">Distance</span>
                  </th>
                  {/* <th>
                    <span className="font-w600 text-black fs-16">Time</span>
                  </th> */}
                  <th>
                    <span className="font-w600 text-black fs-16">
                      Calories Burned
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {CyclingData.map((data, index) => (
                  <tr key={index}>
                    <td>
                      <p className="text-black mb-1 font-w600">{data.day}</p>
                      <span className="fs-14">{data.date}</span>
                    </td>
                    <td>
                      <p className="text-black mb-1 font-w600">
                        {data.distance}
                      </p>
                    </td>
                    {/* <td>
                      <p className="text-black mb-1 font-w600">{data.time}</p>
                    </td> */}
                    <td>
                      <p className="text-black mb-1 font-w600">
                        {data.caloriesBurned}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cycling;
