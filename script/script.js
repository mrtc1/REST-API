/**
 * Created by Marta on 24.11.2015.
 */

$(document).ready(function () {

    var booksDiv=$('#books');
    var addButton=$('#addBookButton');
    var titleInput=$('#titleInput');
    var autorInput=$('#autorInput');
    var descInput=$('#descInput');
    var addRevBtn=$('#addRevButton'); //TODO add review,show current review list


    function loadAllBooks() {

        $.ajax({
            url: 'http://api.coderslab.pl/book',
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                booksDiv.empty();

                json.forEach(function (element, index, array) {

                    var newBookDiv = $('<li class="book"><div id='+element.id+ '>'+ element.name + '</div>');
                    var deleteButton = $("<button class='deleteBtn' data-id='"+ element.id + "'> Delete</button>");
                    var infoButton = $("<button class='infoBtn' data-id='" + element.id + "'> More info</button>")
                    var listInfo=$('<ul id="'+element.id+ '"></ul>');

                    newBookDiv.append(infoButton);
                    newBookDiv.append(deleteButton);
                    newBookDiv.append(listInfo);
                    booksDiv.append(newBookDiv);
                });
            },
            error: function (xhr, status, errorThrown) {
                console.log('error');
                console.log(status);
            },
            complete: function (xhr, status) {
                console.log('complete');
                console.log(status);
            }
        })
    }
    loadAllBooks();

    addButton.on('click',function(){

        var bookTitle= titleInput.val();
        var bookAutor= autorInput.val();
        var bookDesc= descInput.val();


        if(bookTitle.length>0 && bookAutor.length>0 && bookDesc.length >0){

            var newBook ={"name":bookTitle ,"autor":bookAutor, "description":bookDesc};
            var jasonBook=JSON.stringify(newBook);

            $.ajax({//TODO clean inputs
                url: 'http://api.coderslab.pl/book',
                type: 'POST',
                dataType: 'text',
                data:jasonBook,
                success: function (text) {
                    loadAllBooks();
                },
                error: function (xhr, status, errorThrown) {
                    console.log('error');
                    console.log(status);
                },
                complete: function (xhr, status) {
                    console.log('complete');
                    console.log(status);
                }
            });
        }
    });

    booksDiv.on('click','.deleteBtn',function(event){ //TODO add removing button to every review
        $.ajax({
            url: 'http://api.coderslab.pl/book/'+$(this).data('id'),
            type: 'DELETE',
            dataType: 'json',
            success: function (json) {
                loadAllBooks();
            },
            error: function (xhr, status, errorThrown) {
                console.log('error');
                console.log(status);
            },
            complete: function (xhr, status) {
                console.log('complete');
                console.log(status);
            }

        });

    });

    booksDiv.on('click','.infoBtn',function(event){
        var btnParent=$(this).parent();
        $(this).removeClass('infoBtn');
        $.ajax({
            url: 'http://api.coderslab.pl/book/'+$(this).data('id'),
            type: 'GET',
            dataType: 'json',
            success: function (element) {
                newInfoDiv = $('<div class="bookInfo"> Title: ' + element.name + '<br>' +
                    'Desc: '+ element.description + '<br>'+'Author: '+ element.autor +
                    '</div><br> <input id="revInput" placeholder="review" type="text"><br>' +
                    '<input id="ratingInput" placeholder="rating" type="number"><br> ' +
                    '<button id="addRevButton">Add</button>');
                btnParent.append(newInfoDiv);
            },
            error: function (xhr, status, errorThrown) {
                console.log('error');
                console.log(status);
            },
            complete: function (xhr, status) {
                console.log('complete');
                console.log(status);
            }
        });

        $.ajax({
            url: 'http://api.coderslab.pl/book/'+$(this).data('id')+'/review',
            type: 'GET',
            dataType: 'json',
            success: function (element) {
                element.forEach(function(element,index,array){
                    newRev = $("<div class='review'>" + element.review +
                        '<br> rating: '+ element.rating+ "</div>")
                    btnParent.append(newRev);
                });
            },
            error: function (xhr, status, errorThrown) {
                console.log('error');
                console.log(status);
            },
            complete: function (xhr, status) {
                console.log('complete');
                console.log(status);
            }
        });
    });
});

