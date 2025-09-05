'use client';
import { ResponsiveBar } from '@nivo/bar';
import { useEffect, useState } from 'react';

const Graph = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      className={isMobile ? "w-[95%] h-[300px]" : "w-[600px] h-[300px]"}
      style={{
        maxWidth: isMobile ? "100%" : "none",
        overflowX: "auto", // Prevent overflow on smaller screens
      }}
    >
      <ResponsiveBar
        data={data}
        keys={['placed']}
        indexBy="year"
        margin={isMobile ? 
          { top: 20, right: 10, bottom: 50, left: 30 } : 
          { top: 20, right: 20, bottom: 50, left: 60 }
        }
        padding={0.3}
        colors={['#C891C8']}
        borderRadius={4}
        layout="horizontal"
        maxValue={100}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: isMobile ? -30 : 0,
          legend: 'Percentage Placed',
          legendPosition: 'middle',
          legendOffset: 36,
          format: (value) => `${value}%`,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Year',
          legendPosition: 'middle',
          legendOffset: -40,
          format: (value) => isMobile ? `20${value}` : value,
        }}
        enableGridX={true}
        enableGridY={false}
        theme={{
          fontSize: 11,
          axis: {
            legend: {
              text: {
                fontSize: 12,
              },
            },
            ticks: {
              text: {
                fontSize: isMobile ? 10 : 11,
              },
            },
          },
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
      />
    </div>
  );
};

export default Graph;
