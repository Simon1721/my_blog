require('./web/init');
require('./service/init')
require('./dao/init')

// const comServ = require('./service/commentServer')

// const result = comServ.findComment(2).then(e=>{console.log(e);})

const artServ = require('./service/articleServer');

// async function updateart (){
//     const result = await artServ.findArticleById(7)
//     console.log(result.content);
// }
// updateart()

async function updateart (){
    const result = await artServ.updateArticle(29,{
        content:`<h3 style="color: #222;">概念</h3><br>
        <p style="text-indent: 2em;">
            选择排序(Selection-sort)是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。
        </p><br>
        <p style="text-indent: 2em;">
            表现最稳定的排序算法之一，因为无论什么数据进去都是O(n2)的时间复杂度，所以用到它的时候，数据规模越小越好。唯一的好处可能就是不占用额外的内存空间了吧。理论上讲，选择排序可能也是平时排序一般人想到的最多的排序方法了吧。
        </p><br>
        <p style="text-indent: 2em;">
            
        </p><br><br>
        <br>
        <br>
        <p style="text-indent: 2em;">
            *算法描述: 
        </p><br>
        <p style="text-indent: 2em;">
            n个记录的直接选择排序可经过n-1趟直接选择排序得到有序结果。具体算法描述如下：    
        </p><br>
        <p style="text-indent: 2em;">
            初始状态：无序区为R[1..n]，有序区为空；
        </p><br>
        <p style="text-indent: 2em;">
            第i趟排序(i=1,2,3…n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；
        </p><br>
        <p style="text-indent: 2em;">
            n-1趟结束，数组有序化了。
        </p><br><br>
        <br>
        <br>
        <p style="text-indent: 2em;">
            *动画演示：
        </p><br>
        <img src="https://img-blog.csdnimg.cn/20190517142411197.gif" alt="" width="700"><br>
        <p style="text-indent: 2em;">
            *算法实例：
        </p><br>
        <p style="text-indent: 2em;">
            <pre>
                function selectionSort(arr) {
                    if (arr == null || arr.length < 2) {
                        return arr;
                    }
                    for (var i = 0; i < (arr.length - 1); i++) {
                        let minIndex = i;
                            for (let j = i + 1; j < arr.length; j++) {
                                minIndex = arr[j] < arr[minIndex] ? j : minIndex;
                            }
                        let temp = arr[i];
                        arr[i] = arr[minIndex];
                        arr[minIndex] = temp;
                      }
                    return arr;
                 }
                var arr = [1, 3, 2, 8, 9, 1, 5];
                console.log(arr); // [1, 3, 2, 8, 9, 1, 5]
                selectionSort(arr);
                console.log(arr); // [1, 1, 2, 3, 5, 8, 9]
            </pre>
        </p>`
    })
    console.log(result);
}

updateart()