export default function VideoMessage() {
  return (
    <section id="video" className="py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12 animate-on-scroll">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">A Message for You</h2>
        <p className="text-text-secondary">Press play. I have something to say to you.</p>
      </div>

      <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white animate-on-scroll bg-black flex items-center justify-center">
        <video 
          controls 
          className="w-full h-full object-cover"
          poster="/7.jpeg"
        >
          <source src="/WIN_20260410_20_48_59_Pro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
