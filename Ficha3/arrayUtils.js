var arrayUtils = {
    isEmpty: function(array) {
        if (array != undefined && array != null) {
            return array.length == 0;
        } else {
            return "Array is undefined"
        }
    },
    max: function(array) {
        if (this.isEmpty(array)) {
            return "Array está vazio"
        } else {
            var m = array[0];
            for (let i = 1; i < array.length; i++) {
                if (array[i] > m) {
                    m = array[i];
                }

            }
            return m
        }

    },
    min: function(array) {
        var m = array[0];
        for (let i = 1; i < array.length; i++) {
            if (array[i] < m) {
                m = array[i];
            }

        }
        return m
    },
    average: function(array) {
        var ave = 0
        for (let i = 0; i < array.length; i++) {
            ave += array[i];
        }
        var avg = ave / array.length
        return avg;
    },
    indexOf: function(array, index) {
        return array[index]
    },
    subArray: function(array, startIndex, EndIndex) {
        emptyArray = []
        for (let i = startIndex; i < array.length[EndIndex]; i++) {
            emptyArray += array[i];
        }
        return emptyArray
    },
};









module.exports = arrayUtils;