import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    Home, 
    PlusCircle, 
    MessageCircle, 
    User, 
    MapPin,
    Bell
} from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Layout({ children, currentPageName }) {
    const location = useLocation();
    const [user, setUser] = useState(null);

    // Simulated user (replace with real auth later)
    useEffect(() => {
        const fakeUser = {
            full_name: "John Doe",
            avatar_url: ""
        };

        setUser(fakeUser);
    }, []);

    const navItems = [
        { icon: Home, label: "Feed", path: "/" },
        { icon: MapPin, label: "Map", path: "/map" },
        { icon: PlusCircle, label: "Sell", path: "/create", highlight: true },
        { icon: MessageCircle, label: "Chat", path: "/messages" },
        { icon: User, label: "Profile", path: "/profile" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            {/* Desktop Header */}
            <header className="hidden md:flex items-center justify-between px-6 h-16 bg-white border-b">
                
                {/* Logo */}
                <Link to="/" className="font-bold text-xl">
                    HyperLocal
                </Link>

                {/* Navigation */}
                <nav className="flex gap-4">
                    {navItems.filter(item => !item.highlight).map(item => (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={`px-3 py-1 rounded ${
                                currentPageName === item.path
                                    ? 'bg-gray-200'
                                    : 'text-gray-500'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    <Bell />

                    <Link to="/create">
                        <Button>
                            <PlusCircle size={16} /> Post
                        </Button>
                    </Link>

                    {user ? (
                        <Link to="/profile">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                {user.avatar_url ? (
                                    <img src={user.avatar_url} className="w-full h-full rounded-full" />
                                ) : (
                                    user.full_name[0]
                                )}
                            </div>
                        </Link>
                    ) : (
                        <Button variant="outline">Sign In</Button>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-4">
                {children}
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around h-16">
                {navItems.map(item => {
                    const isActive = currentPageName === item.path;

                    return (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={`flex flex-col items-center justify-center text-xs ${
                                isActive ? 'text-indigo-600' : 'text-gray-400'
                            }`}
                        >
                            {item.highlight ? (
                                <div className="bg-black text-white rounded-full p-3 -mt-6">
                                    <item.icon size={20} />
                                </div>
                            ) : (
                                <>
                                    <item.icon size={20} />
                                    {item.label}
                                </>
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
