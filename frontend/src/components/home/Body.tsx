import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import StatisticsCard from '../home/Card';
import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, FileUp } from 'lucide-react'
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const cardData = [
    { title: "Total vulnerabilities", value: "9", description: "SQL injection, XSS..." },
    { title: "Statistics name 2", value: "456", description: "other text" },
    { title: "Statistics name 3", value: "789", description: "other text" }
  ];

export default function Body() {
    const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);


    const handleUploadClick = () => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      };
      const handleButtonClick = () => {
        navigate('/analyzer');
      };

      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cardData.length);
        }, 6000); // Change card every 3 seconds
    
        return () => clearInterval(interval);
      }, []);

  return (
    <main className="flex-grow flex  px-16">
      <div className="flex gap-10 w-full">
        <div className="flex flex-col gap-4 w-[650px]">
          <Card className="w-[400px]">
            <CardContent className="flex flex-col gap-3 p-9">
              <div className="flex items-center gap-2.5">
                <div className="p-4 rounded-md">
                  <ShieldCheck className="w-12 h-12 " />
                </div>
                <span className="text-base">Get a full report with one click</span>
              </div>

              <div className="relative h-[126px] w-[328px] overflow-hidden">
                {cardData.map((card, index) => (
                  <StatisticsCard
                    key={index}
                    title={card.title}
                    value={card.value}
                    description={card.description}
                    className={`  w-[328px] absolute top-0 left-0 transition-transform duration-300 ease-in-out ${
                      index === currentCardIndex ? 'translate-x-0' : '-translate-x-full'
                    }`}
                  />
                ))}
              </div>


              <Button 
        variant="outline" 
        className="w-[127px] h-10 bg-white border border-zinc-200 rounded-md flex items-center justify-center gap-2"
        onClick={handleUploadClick}
      >
        <FileUp className="w-[22px] h-5" />
        <span className="text-sm font-medium text-slate-900">Upload CSV</span>
      </Button>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
              <Input placeholder="Website URL" />
              <Input placeholder="GitHub URL (optional)" />
              <Button variant="outline" className="border-yellow-400 rounded-full" onClick={handleButtonClick}>
              Get Started
              </Button>
            </CardContent>
          </Card>
          <h2 className="text-6xl font-normal text-white leading-tight">
            Check your site and be at peace
          </h2>
        </div>
        <div className=" flex  items-center w-3/6 h-3/6 my-10 mx-auto">
            <img src="../../images/foto1.svg" alt="Centered Image" className="animate-up-down"/>
        </div>
      </div>
    </main>
  )
}

