import { RECIPIENT_NAME } from '../constants';

export default function LoveLetter() {
  return (
    <section id="letter" className="py-20 bg-primary-light/5 px-4">
      <div className="max-w-2xl mx-auto animate-on-scroll">
        <div className="bg-card p-8 md:p-12 rounded-lg shadow-xl border border-primary-light/20 relative overflow-hidden">
          {/* Decorative wax seal */}
          <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/30 rotate-12">
            <span className="text-primary font-handwriting text-2xl">S</span>
          </div>

          <div className="font-handwriting text-3xl text-primary mb-8">
            My dearest {RECIPIENT_NAME},
          </div>

          <div className="space-y-6 text-text-primary leading-relaxed font-body text-lg">
            <p>
              As I sit down to write this, I find myself overwhelmed with gratitude for having you in my life. 
              Another year has passed, and my love for you has only grown deeper and stronger.
            </p>
            <p>
              I still remember the first time we met. I didn't know then that you would become my entire world, 
              but there was a spark that I couldn't ignore. Looking back, it was the best thing that ever happened to me.
            </p>
            <p>
              You make every day brighter just by being in it. Your kindness, your strength, and your beautiful soul 
              inspire me every single day. You are my best friend, my partner in crime, and my greatest love.
            </p>
            <p>
              I hope this birthday is as wonderful as you are. I can't wait to see what the next year brings for us 
              and to make even more beautiful memories together.
            </p>
          </div>

          <div className="mt-12 font-handwriting text-3xl text-primary">
            Forever yours,<br />
            Hammad
          </div>
        </div>
      </div>
    </section>
  );
}
