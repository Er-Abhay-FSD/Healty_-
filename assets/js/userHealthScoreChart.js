function userHealthChart(input) {
  input = parseFloat(input).toFixed(1) * 10;
  // console.log("first ",parseFloat(input).toFixed(2)*10);
  window.feed = function (callback) {
    var tick = {};
    tick.plot0 = Math.ceil(350 + (Math.random() * 500));
    callback(JSON.stringify(tick));
  };
  // alert(parseFloat($('#healthScore').text()).toFixed(2)*10);  
  var myConfig = {
    type: "gauge",
    globals: {
      fontSize: 25
    },
    plotarea: {
      marginTop: 80
    },
    plot: {
      size: '100%',
      valueBox: {
        placement: 'center',
        text: '%v', //default
        fontSize: 35,
        rules: [
          {
            rule: '%v >= 8',
            text: '%v<br>EXCELLENT'
          },
          {
            rule: '%v >= 6 && %v < 8',
            text: '%v<br>Good'
          },
          {
            rule: '%v >= 4 && %v < 6',
            text: '%v<br>Fair'
          },
          {
            rule: '%v <= 4',
            text: '%v<br>Bad'
          }
        ]
      }
    },
    tooltip: {
      borderRadius: 5
    },
    scaleR: {
      aperture: 180,
      minValue: 0,
      maxValue: 10,
      step: 1,
      center: {
        visible: false
      },
      tick: {
        visible: false
      },
      item: {
        offsetR: 0,
        rules: [
          {
            rule: '%i == 10',
            offsetX: 15
          }
        ]
      },
      // labels:['300','','','','','','580','640','700','750','','850'],
      labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      ring: {
        size: 50,
        rules: [
          {
            rule: '%v <= 4',
            backgroundColor: '#E53935'
          },
          {
            rule: '%v >= 4 && %v < 6',
            backgroundColor: '#EF5350'
          },
          {
            rule: '%v >= 6 && %v < 8',
            backgroundColor: '#6ceb70'
          },
          {
            rule: '%v >= 8',
            backgroundColor: '#03fc0b'
          }
        ]
      }
    },
    refresh: {
      type: "feed",
      transport: "js",
      // url:"feed()",
      url: "",
      interval: 1500,
      resetTimeout: 1000
    },

    series: [
      {
        values: [input], // starting value
        backgroundColor: 'black',
        indicator: [10, 10, 10, 10, 0.75],
        animation: {
          effect: 2,
          method: 1,
          sequence: 4,
          speed: 900
        },
      }
    ]
  };
  console.log($('#healthScore').text());
  zingchart.render({
    id: 'myChart',
    data: myConfig,
    height: 500,
    width: '100%'
  });
}