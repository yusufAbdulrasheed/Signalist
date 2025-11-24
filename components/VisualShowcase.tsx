import Image from "next/image";

export function VisualShowcase() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Experience the Power of Trade Connect
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Our intuitive interface is designed to be powerful yet easy to use.
        </p>
        <div className="mt-10">
          <Image
            src="/assets/images/dashboard-preview.png"
            alt="Trade Connect Dashboard"
            width={1200}
            height={675}
            className="rounded-lg shadow-2xl mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
