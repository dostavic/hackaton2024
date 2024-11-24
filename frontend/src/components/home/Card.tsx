// Assuming StatisticsCard is a functional component
import React from 'react';
import { Card, CardContent } from "@/components/ui/card"

interface StatisticsCardProps {
    title: string;
    value: string;
    description: string;
    className?: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, value, description, className }) => {
    return (
        <Card className={`border shadow-sm ${className}`}>
            <CardContent className="p-6">
                <h3 className="text-sm font-medium mb-2">{title}</h3>
                <p className="text-2xl font-medium">{value}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
};

export default StatisticsCard;