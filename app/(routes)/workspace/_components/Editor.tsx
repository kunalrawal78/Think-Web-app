"use client"
import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Checklist from '@editorjs/checklist'
//@ts-ignore
import SimpleImage from "@editorjs/simple-image";
//@ts-ignore
import CodeTool from '@rxpm/editor-js-code';
// @ts-ignore
const Table = require('editorjs-table');
// @ts-ignore


import ChangeCase from 'editorjs-change-case';
// @ts-ignore

import Underline from '@editorjs/underline';
// @ts-ignore

import Undo from 'editorjs-undo';
// @ts-ignore

import Paragraph from '@editorjs/paragraph';

// @ts-ignore
import Warning from '@editorjs/warning';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FILE } from '../../dashboard/_components/FileList';

const rawDocument={
    "time" : 1550476186479,
    "blocks" : [{
        data:{
            text:'Document Name',
            level:2
        },
        id:"123",
        type:'header'
    },
    {
        data:{
            level:4
        },
        id:"1234",
        type:'header'
    }],
    "version" : "2.8.1"
}
function Editor({onSaveTrigger,fileId,fileData}:{onSaveTrigger:any,fileId:any,fileData:FILE}) {
    const ref=useRef<EditorJS>();
    const updateDocument=useMutation(api.files.updateDocument);
    const [document,setDocument]=useState(rawDocument);
    useEffect(()=>{
        fileData&&initEditor();
    },[fileData])

    useEffect(()=>{
      console.log("triiger Value:",onSaveTrigger);
      onSaveTrigger&&onSaveDocument();
    },[onSaveTrigger])

    const initEditor=()=>{
        const editor = new EditorJS({
          

            tools:{
                header: {
                    class: Header,
                    shortcut: 'CMD+SHIFT+H',
                    config:{
                        placeholder:'Enter a Header'
                    }
                  },
                  list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                      defaultStyle: 'unordered'
                    }
                  },
                  checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                  },
                  image: SimpleImage,

                  table: {
                    class: Table,
                  },
                  underline: Underline,
                  changeCase: {
                    class: ChangeCase,
                    config: {
                      showLocaleOption: true, // enable locale case options
                      locale: 'tr' // or ['tr', 'TR', 'tr-TR']
                    }
                  },
                  code: {
                    class: CodeTool,
                    config: {
                      modes: {
                        'cpp': 'C++',
                        'js': 'JavaScript',
                        'py': 'Python',
                        'go': 'Go',
                        'cs': 'C#',
                        'java': 'java',
                      },
                      defaultMode: 'C++',
                      useDefaultTheme: 'dark'
        
                    }
                  },
        
                  paragraph: Paragraph,
                  warning: Warning,
            },
           
            holder: 'editorjs',
            onReady: () => {
              new Undo({ editor });
            },
            data:fileData?.document?JSON.parse(fileData.document):rawDocument
          });
          ref.current=editor;
    }

    const onSaveDocument=()=>{
      if(ref.current)
      {
        ref.current.save().then((outputData) => {
          console.log('Article data: ', outputData);
          updateDocument({
            _id:fileId,
            document:JSON.stringify(outputData)
          }).then(resp=>{
            
              toast('Document Updated!')
            
          },(e)=>{
            toast("Server Error!")
          })
        }).catch((error) => {
          console.log('Saving failed: ', error)
        });
      }
    }
  return (
    <div>
        <div id='editorjs' className='ml-16'></div>
    </div>
  )
}

export default Editor