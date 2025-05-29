export function CalendarSection() {
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

  return (
    <div className="p-4">
      <h3 className="text-sm font-bold mb-2">CURRENT WEEK'S SCHEDULE</h3>
      <div className="calendar-grid">
        {days.map((day) => (
          <div key={day} className="calendar-header">
            {day}
          </div>
        ))}
        {Array.from({ length: 21 }).map((_, i) => (
          <div key={i} className="calendar-day">
            {i % 3 === 0 ? "6:00 AM\nStrength" : i % 3 === 1 ? "5:30 PM\nMobility" : "7:00 PM\nConditioning"}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button className="text-xs border border-red-500 text-red-500 px-4 py-2">VIEW FULL SCHEDULE</button>
      </div>
    </div>
  )
}
