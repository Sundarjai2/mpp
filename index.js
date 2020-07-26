var jsonData;
$(function () {
    $(document).ready(function () {
        // Get data from products.json file
        $.getJSON('products.json', function (data) {
            jsonData = [...data];
            var template = $("#mpp_template").html();
            var templatedata = Mustache.render(template, { products: data });
            $(".mpp-grid").html(templatedata);

            var lengthtemplate = $("#length_template").html();
            var lengthData = Mustache.render(lengthtemplate, { length: data.length });
            $(".mpp-filter__productlength--display").html(lengthData);

            var categoryTemplate = $("#category_template").html();
            var categoryType = removeDuplicates(data, "type");
            var categoryData = Mustache.render(categoryTemplate, { categorylist: categoryType });
            $("#mpp-filter").html(categoryData);

        });
        $('.mpp-sort-select').on('change', function () {
            var sortData;
            var selectedValue = $(this).children("option:selected").val();
            if (selectedValue == "asc") {
                sortData = sortJSON(jsonData, "price", '0');
            } else if (selectedValue == "desc") {
                sortData = sortJSON(jsonData, "price", '1');
            } else if (selectedValue == "rating-desc") {
                sortData = sortJSON(jsonData, "rating", '1');
            } else if (selectedValue == "newest-desc") {
                sortData = jsonData;
            } else {
                sortData = jsonData;
            }
            var template = $("#mpp_template").html();
            var templatedata = Mustache.render(template, { products: sortData });
            $(".mpp-grid").html(templatedata);
            
            var lengthtemplate = $("#length_template").html();
            var lengthData = Mustache.render(lengthtemplate, { length: sortData.length });
            $(".mpp-filter__productlength--display").html(lengthData);
            
        });
        $(document).on('click', '.mpp-category_template', function () {
            var categoryType = $(this).attr("categorytype");
            var filterdData = jsonData.filter(function (item) {
                return item.type == categoryType;
            });
            var template = $("#mpp_template").html();
            var templatedata = Mustache.render(template, { products: filterdData });
            $(".mpp-grid").html(templatedata);

            var lengthtemplate = $("#length_template").html();
            var lengthData = Mustache.render(lengthtemplate, { length: filterdData.length });
            $(".mpp-filter__productlength--display").html(lengthData);
        });
    });
});
function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}
function sortJSON(arr, key, way) {
    return arr.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        if (way === '0') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '1') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}