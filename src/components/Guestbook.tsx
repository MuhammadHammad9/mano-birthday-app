import React, { useState, useEffect } from 'react';
import { Send, MessageSquare, LogIn } from 'lucide-react';
import { db, auth, loginWithGoogle, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from '../firebase';
import { handleFirestoreError, OperationType } from '../firestoreUtils';
import { onAuthStateChanged, User } from 'firebase/auth';

interface Message {
  id: string;
  name: string;
  message: string;
  emoji?: string;
  createdAt: any;
}

export default function Guestbook() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    const path = 'wishes';
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    
    const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(msgs);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeSnapshot();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message || !user) return;

    const path = 'wishes';
    try {
      await addDoc(collection(db, path), {
        name,
        message,
        emoji: '💖',
        createdAt: serverTimestamp(),
        authorUid: user.uid
      });
      setName('');
      setMessage('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-text-secondary">
        <p>Loading guestbook...</p>
      </div>
    );
  }

  return (
    <section id="guestbook" className="py-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-16 animate-on-scroll">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Guestbook</h2>
        <p className="text-text-secondary">Leave a wish for the birthday girl!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Form */}
        <div className="animate-on-scroll">
          {!user ? (
            <div className="bg-white p-8 rounded-3xl border border-primary-light/30 shadow-lg text-center">
              <LogIn className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-xl font-bold text-primary-dark mb-4">Sign in to leave a wish</h3>
              <p className="text-text-secondary mb-6 text-sm">We use Google Login to keep the guestbook safe and friendly.</p>
              <button 
                onClick={loginWithGoogle}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                Sign in with Google
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-primary-light/30 shadow-lg">
              <div className="mb-6">
                <label className="block text-sm font-bold text-primary-dark mb-2 uppercase tracking-wider">Your Name</label>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Who are you?"
                  className="w-full px-6 py-3 rounded-xl border-2 border-primary-light/20 focus:border-primary outline-none transition-colors"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-bold text-primary-dark mb-2 uppercase tracking-wider">Your Message</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write something sweet..."
                  rows={4}
                  className="w-full px-6 py-3 rounded-xl border-2 border-primary-light/20 focus:border-primary outline-none transition-colors resize-none"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                <Send size={18} /> Send Wish
              </button>
              <p className="mt-4 text-[10px] text-center text-text-secondary uppercase tracking-widest">
                Signed in as {user.displayName || user.email}
              </p>
            </form>
          )}
        </div>

        {/* Messages List */}
        <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 animate-on-scroll">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white p-6 rounded-2xl border border-primary-light/20 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-primary-dark">{msg.name}</h4>
                <span className="text-xl">{msg.emoji}</span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">{msg.message}</p>
            </div>
          ))}
          
          {messages.length === 0 && (
            <div className="text-center py-12 text-text-secondary opacity-50">
              <MessageSquare size={48} className="mx-auto mb-4" />
              <p>No wishes yet. Be the first!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
