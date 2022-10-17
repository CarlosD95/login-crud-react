import React from 'react'
import LineGraph from "@chartiful/react-line-graph";

const Graph = () => {
  return (
    <div class="container d-grid justify-content-center align-items-center h-100 mt-4">
        <h1>Number of visits to the web, in the last months </h1>
        <LineGraph
                data={[10, 150, 70, 40, 37, 22, 100, 65]}
                width={800}
                height={300}
                lineColor="#347975"
                dotColor="#347975"
                lineWidth={3}
                isBezier
                hasDots={true}
                baseConfig={{
                  startAtZero: false,
                  hasXAxisBackgroundLines: false,
                  xAxisLabelStyle: {
                    prefix: '',
                    offset: 0
                  }
                }}
                style={{
                  marginBottom: 30,
                  padding: 10,
                  paddingTop: 20,
                  borderRadius: 20,
                  backgroundColor: `#dbf0ef`
                }}
        />
    </div>
  )
}

export default Graph