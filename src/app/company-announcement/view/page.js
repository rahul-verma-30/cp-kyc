import ViewAnnouncements from "@/components/CompanyAnnouncement/ViewAnnouncements";

export const metadata = {
  title: "Company Announcements | Corporate Disclosures",
  description: "View real-time corporate announcements, filings, and regulatory updates across companies.",
};

export default function ViewAnnouncementsPage() {
  return (
    <main>
      <ViewAnnouncements />
    </main>
  );
}
