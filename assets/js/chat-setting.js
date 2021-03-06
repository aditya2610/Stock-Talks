
class Reply{
    constructor(messageId){
        this.reply(messageId);
    }
    reply(messageId){
        $(messageId).click(function(e){
            e.preventDefault();
            let h=$(messageId).attr('href');
            $('#message-input').val(`Replying to ${h}--> `);
            $('#reply-link').val(`${h}`);
        })
    }
}
class Delete{
    constructor(messageId){
        this.delete_message(messageId);
    }

    delete_message(messageId){
        $(messageId).click(function(e){
            e.preventDefault();
            console.log("Message to be deleted=  ",messageId);
            console.log($(messageId).attr('href'));
            $.ajax({
                type:'get',
                url:$(messageId).attr('href'),
                
                success:function(data){
                    console.log("Mesaage deleted... ",data.data.message_id);
                    $(`#${data.data.message_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Message Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
}