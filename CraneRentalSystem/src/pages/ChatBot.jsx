import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader, CardFooter } from "../components/ui/Card";
import { Bot, X, Send, MessageCircle } from "lucide-react";

export default function Chatbot() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi there 👋\nHow can I help you today?",
            isBot: true,
        },
    ]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false); // Default closed state

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            text: input,
            isBot: false,
        };
        setMessages([...messages, newMessage]);
        setInput("");

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: input }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Received from backend:", data);

            if (data.reply) {
                const botResponse = {
                    id: messages.length + 2,
                    text: data.reply,
                    isBot: true,
                };
                setMessages((prev) => [...prev, botResponse]);
            } else {
                console.error("Error: No reply from backend");
            }
        } catch (error) {
            console.error("Error while fetching response from backend:", error);
            const errorMessage = {
                id: messages.length + 2,
                text: "Sorry, something went wrong. Please try again later.",
                isBot: true,
            };
            setMessages((prev) => [...prev, errorMessage]);
        }
    };

    return (
        <div>
            {/* Chat button to toggle chat */}
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-5 right-5 h-14 w-14 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition duration-200"
                >
                    <MessageCircle className="h-6 w-6" />
                    <span className="sr-only">Open chat</span>
                </Button>
            )}

            {/* Chatbot window */}
            {isOpen && (
                <div className="fixed bottom-5 right-5 z-50 w-[350px]">
                    <Card className="shadow-lg w-full rounded-lg">
                        <CardHeader className="bg-purple-600 rounded-t-lg">
                            <div className="flex justify-between items-center text-white">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-full shadow-md">
                                        <Bot className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <h2 className="font-semibold">Chatbot</h2>
                                </div>
                                <Button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white hover:bg-purple-500 rounded-full p-1"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="h-[300px] overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex gap-3 ${message.isBot ? "justify-start" : "justify-end"}`}
                                >
                                    {message.isBot && (
                                        <div className="bg-gray-100 p-2 rounded-full shadow-md h-10">
                                            <Bot className="h-6 w-6 text-gray-600" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[80%] rounded-lg px-4 py-2 ${message.isBot
                                            ? "bg-gray-100 text-black"
                                            : "bg-purple-600 text-white"
                                            }`}
                                    >
                                        <p className="whitespace-pre-line">{message.text}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="bg-gray-50 rounded-b-lg p-4 border-t border-gray-300">
                            <form onSubmit={handleSubmit} className="flex w-full gap-2">
                                <Input
                                    placeholder="Enter a message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex-1"
                                />
                                <Button
                                    type="submit"
                                    className="bg-purple-600 hover:bg-purple-700 p-2 rounded-full shadow-md"
                                >
                                    <Send className="h-4 w-4 text-white" />
                                </Button>
                            </form>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    );
}
