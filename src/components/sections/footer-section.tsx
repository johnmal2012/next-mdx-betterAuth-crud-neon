import { physicianData } from "@/data/physician";

export default function FooterSection() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-200 px-6 py-10 text-gray-600">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <h3 className="text-lg font-semibold">
            {physicianData.clinicName}
          </h3>

          <p className="text-sm text-gray-500">
            {physicianData.clinicAddress}
          </p>
        </div>

        <p className="text-sm text-gray-500">
          © {currentYear} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
