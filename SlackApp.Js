const express = require('express')
const bodyParser = require('body-parser')
const { createEventAdapter } = require('@slack/events-api')
const { createMessageAdapter } = require('@slack/interactive-messages')
const { WebClient } = require('@slack/web-api')
const port = process.env.PORT || 3000 
const app = express()
const token = "xoxb-xxxx";  //Enter your authToken
const slackEvents = createEventAdapter("69170acf538fc56**********"); //Use your own keys here
const slackInteractions = createMessageAdapter("69170acf538fc56e1**********")

const webClient = new WebClient(token);

app.use('/slack/events', slackEvents.expressMiddleware());
app.use('/slack/actions', slackInteractions.expressMiddleware())
slackEvents.on('app_mention',async (event)=>{
    try{
        const res = await webClient.chat.postMessage({channel : "CHANNEL_ID",
        text:"",
        ...messageJsonBlock})
        console.log('Message sent: ', res.ts)
    } catch(error){

        console.log("ERROR SlackApp.js line (25) : "+error);
    }
})

slackInteractions.action({ actionId: 'open_modal_button' }, async (payload) => {
    try{
          await webClient.views.open({
          trigger_id: payload.trigger_id,
          view: modalJsonBlock
        })
    } catch(error){

        console.log("Error SlackApp.js line (37) : "+error);
    }
})

slackInteractions.viewSubmission('Workplace_survey_submit' , async (payload) => {
    const blockData = payload.view.state
    //console.log(blockData);
    // const asnwerToLikert = blockData.values.cute_animal_selection_block.cute_animal_selection_element.selected_option.value
    // const nameInput = blockData.values.cute_animal_name_block.cute_animal_name_element.value
  
    // console.log(cuteAnimalSelection, nameInput) 
    const asnwerToLikert = blockData.values.likert_block.likert_element.selected_option.value;
    const plain_response = blockData.values.text_response.plain_response.value;
    console.log("Submitted Data for likert is : " + asnwerToLikert);
    console.log("Text Response is : "+ plain_response);
})


app.listen(port, function() {
    console.log('Bot is listening on port : ' + port)
  })

  messageJsonBlock = {

    "blocks":[
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Hey *Tushar*, Please fill in your workplace survey."
            }
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "action_id" : "open_modal_button",
                    "text": {
                        "type": "plain_text",
                        "emoji": true,
                        "text": "Launch",
                    
                    },
                    "style": "primary",
                    "value": "launch_button_click"
                }
            ]
        }
    ]
  }

  modalJsonBlock = 
		{
            "type": "modal",
            "callback_id": "Workplace_survey_submit",
            "title": {
                "type": "plain_text",
                "text": "Workplace Survey",
                "emoji": true
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": true
            },
            "close": {
                "type": "plain_text",
                "text": "Cancel",
                "emoji": true
            },
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": ":wave: Hey David!\n\nWe'd love to hear from you how we can make this place the best place you’ve ever worked.",
                        "emoji": true
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "input",
                    "block_id": "likert_block",
                    "label": {
                        "type": "plain_text",
                        "text": "You enjoy working here at Culturro",
                        "emoji": true
                    },
                    "element": {
                        "type": "radio_buttons",
                        "action_id": "likert_element",
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Strongly agree",
                                    "emoji": true
                                },
                                "value": "5"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Agree",
                                    "emoji": true
                                },
                                "value": "4"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Neither agree nor disagree",
                                    "emoji": true
                                },
                                "value": "3"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Disagree",
                                    "emoji": true
                                },
                                "value": "2"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Strongly disagree",
                                    "emoji": true
                                },
                                "value": "1"
                            }
                        ]
                    }
                },
                {
                    "type": "input",
                    "block_id": "text_response",
                    "label": {
                        "type": "plain_text",
                        "text": "What can we do to improve your experience working here?",
                        "emoji": true
                    },
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "plain_response",
                        "multiline": true
                    }
                },
                {
                    "type": "input",
                    "block_id" :"optional_ques" ,
                    "label": {
                        "type": "plain_text",
                        "text": "Anything else you want to tell us?",
                        "emoji": true
                    },
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "optional_submit",
                        "multiline": true
                    },
                    "optional": true
                }
            ]
        }
