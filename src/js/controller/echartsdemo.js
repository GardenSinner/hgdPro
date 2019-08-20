require.config({
  shim: {
    strap: ['jquery']
  },
  paths: {
    jquery: '/lib/jquery-1.12.4.min',
    eachats: '/lib/eacharts',
    strap: '/lib/bootstrapmin'

  }
});
require(['jquery', 'eachats', 'strap'], function($, eachats, strap) { // 设置依赖的模块，就是jQuery文件
  $(document).ready(function() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = eachats.init(document.getElementById('main'));
    var myCharts = eachats.init(document.getElementById('main1'));
    // 指定图表的配置项和数据
    var option = {
      title: {
        subtextStyle: {
          color: '#fff'
        }
      },
      tooltip: {},
      legend: {
        data: [{
          name: '销量',
          textStyle: {
            color: '#fff'
          }
        }],
        top: '20%'
      },
      textStyle: {
        color: '#fff'
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };
    var option2 = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '12',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ]
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    myCharts.setOption(option2);
  });
});
