import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

// const statistics = [
//     { name: "Total Projects", value: "231", subtext: "projects" },
//     { name: "Active Scans", value: "45", subtext: "running" },
//     { name: "Found Issues", value: "1,232", subtext: "vulnerabilities" }
// ]

// const vulnerabilityCards = [
//     {
//         badge: "SQL Injection in login form",
//         name: "Critical vulnerability in authentication system",
//         riskLevel: "High",
//         code: "SELECT * FROM users WHERE username = 'admin' --'",
//         description: "The login form is vulnerable to SQL injection because user input is not properly sanitized."
//     },
//     {
//         badge: "XSS in comment section",
//         name: "Stored XSS vulnerability detected",
//         riskLevel: "Med",
//         code: "<script>alert('XSS')</script>",
//         description: "User comments can be used to inject malicious scripts into the application."
//     },
//     {
//         badge: "CSRF Token Missing",
//         name: "Form submission without CSRF protection",
//         riskLevel: "High",
//         code: "<form action='/submit' method='POST'><input type='submit' value='Submit'></form>",
//         description: "Forms do not include CSRF tokens, making them susceptible to cross-site request forgery attacks."
//     },
// ];

export default function Analyzer() {
    const [statistics, setStatistics] = useState([]);
    const [vulnerabilityCards, setVulnerabilityCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch statistics
                const statsResponse = await axios.get('/api/statistics');
                setStatistics(statsResponse.data);

                // Fetch vulnerability cards
                const vulnerabilitiesResponse = await axios.get('/api/vulnerabilities');
                setVulnerabilityCards(vulnerabilitiesResponse.data);

                // setLoading(false);
            } catch (err) {
                console.log(err);
                // setError(err);
                // setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="relative w-full min-h-screen bg-background">
            <header className="flex items-center justify-between px-8 h-[100px] border-b">
                <Link to="/" className="text-xl font-medium text-slate-900">Testify</Link>
                <div className="flex items-center">
                    <Link to="/About">About us</Link>
                </div>
            </header>

            <main className="p-8 space-y-8">
                <div className="flex items-center gap-2">
                    <Select>
                        <SelectTrigger className="w-[114px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="oldest">Oldest</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-[95px]">
                            <SelectValue placeholder="Tags" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="security">Security</SelectItem>
                            <SelectItem value="network">Network</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Risk Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
                    {statistics.map((stat, index) => (
                        <Card key={index} className="p-6">
                            <CardContent className="p-0 space-y-2">
                                <div className="text-sm font-medium">{stat.name}</div>
                                <div className="space-y-1">
                                    <div className="text-2xl font-medium">{stat.value}</div>
                                    <div className="text-xs text-muted-foreground">{stat.subtext}</div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-[repeat(auto-fit,minmax(370px,1fr))]">
                    {vulnerabilityCards.map((card, index) => (
                        <div key={index} className="flex flex-col rounded-md overflow-hidden">
                            <div className="h-[200px] bg-muted relative group">
                                <Link to={`/VulnerabilityReport/${encodeURIComponent(card.name)}/${encodeURIComponent(card.code)}/${encodeURIComponent(card.output)}/${encodeURIComponent(card.description)}`}>
                                    <img
                                        src={`../../public/images/vulnerability-${index + 1}.jpg`}
                                        alt="Vulnerability preview"
                                        className="w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-75"
                                        style={{ boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.15)' }}
                                    />
                                </Link>
                            </div>
                            <div className="mt-2 space-y-2">
                                <div className="inline-block border-b border-primary px-1">
                                    <span className="text-xs font-extralight">{card.badge}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium truncate">{card.name}</span>
                                    <div className="flex items-center gap-1">
                                        <AlertTriangle size={12} className="text-destructive" />
                                        <span className="text-xs text-muted-foreground">{card.riskLevel}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

