import CustomCalendar from "@/components/common/CustomCalendar";

export default function TestCalendarPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Custom Calendar Test</h1>
        <div className="flex justify-center">
          <CustomCalendar />
        </div>
      </div>
    </div>
  );
}
