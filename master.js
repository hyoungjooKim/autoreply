const scriptName = "master";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    const day = new Date();
    const year = day.getFullYear(); 
    const month = day.getMonth()+1; 
    const date = day.getDate(); 
    const formattedDate = year+'-'+month+'-'+date;
    const today1 = new Date(year, month, date); //  const today = new Date(formattedDate);
    const fixday1 = new Date("2023","12","28"); // const fixday = new Date("2023-12-28");
    const somenum = (today1-fixday1) / 1000 / 60 / 60 / 24;
    const indexnum = somenum % 4;

    var sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();    //절대경로
    var path = sdcard+"/master01/"; // 추후 변경
    var filename = "마스터결사일정.txt"; // 추후 변경
    var content = "";
    var file = new java.io.File(path + filename); // 경로와 파일이름

    if(msg=='영지보스'|msg=='영보결사'){ 
    //     let notice_date = "금일은 "+formattedDate+"일자로 시행된 일로 부터 "+somenum+"일이 지났습니다.";
    //     if(indexnum==0){ replier.reply(notice_date+"\n오늘은 고용노동부결사에서 영지보스를 잡는 날입니다.");   }
    //     if(indexnum==1){ replier.reply(notice_date+"\n오늘은 마스터결사에서 영지보스를 잡는 날입니다.");   }
    //     if(indexnum==2){ replier.reply(notice_date+"\n오늘은 로열결사에서 영지보스를 잡는 날입니다.");   }
    //     if(indexnum==3){ replier.reply(notice_date+"\n오늘은 전기결사에서 영지보스를 잡는 날입니다.");   }  
    let boss_notice1 = "로테이션 보스클리어 정책이 변경되었습니다.\n";
    let boss_notice2 = "50레벨 영지보스인 체스킹, 선지자, 야수는\n";
    let boss_notice3 = "선착순 결사가 먼저 트라이 가능\n";
    let boss_notice4 = "먼저 트라이하는 결사가 존재 시 양보";
    replier.reply(boss_notice1+boss_notice2+boss_notice3+boss_notice4);
    }

    function txtforfile(){
        var folder = new java.io.File(path);
        folder.mkdirs();
        var fos = new java.io.FileOutputStream(file); // 파일을 저장
        content = "파일을 생성합니다.";
        var contentstring = new java.lang.String(content+"\n"); // 저장할 내용
        fos.write(contentstring.getBytes()); // Byte로 변환
        fos.close(); // 작업 종료
    }

    function read_all(){
        try{
            var fis = new java.io.FileInputStream(file); // 파일을 읽을 준비
            var isr = new java.io.InputStreamReader(fis); // 파일 내용 읽기
            var br = new java.io.BufferedReader(isr); 
            var temp_br = br.readLine();
            var temp_readline = "";
            while((temp_readline = br.readLine()) !== null){
                let split_temp_readline = temp_readline.split(",");
                let personal_year = split_temp_readline[0];
                let personal_month = split_temp_readline[1];
                let personal_day = split_temp_readline[2];
                let personal_time = split_temp_readline[3];
                let personal_type = split_temp_readline[4];
                let personal_name = split_temp_readline[5];
                if(personal_name=='DEBUG ROOM'){
                  personal_name = '패럴';
                }
                if(personal_day >= date){
                    let notice1 = '---'+personal_year+'년 '+personal_month+'월 '+personal_day+'일 일정---\n';
                    let notice2 = '종류 : '+personal_type+'\n';
                    let notice3 = '진행시간 : '+personal_time+'\n';
                    let notice4 = '작성자 : '+personal_name+'\n';
                    let notice5 = '-----------------------------';
                    let notice_alter = notice1+notice2+notice3+notice4+notice5 ;
                    replier.reply(notice_alter);
                }
            }
            fis.close();
            isr.close();
            br.close();
        }catch(error){  }
    }

    function read_txt(subnum){
        try{
            var fis = new java.io.FileInputStream(file); // 파일을 읽을 준비
            var isr = new java.io.InputStreamReader(fis); // 파일 내용 읽기
            var br = new java.io.BufferedReader(isr); 
            var temp_br = br.readLine();
            var temp_readline = "";
            
            // const unit_list = ['고용노동부', '마스터', '로열', '전기'];
            // let notice1 = '';
            // let notice2 = '종류 : 영지 보스 \n';
            // let notice3 = '';
            // if(subnum == date){
            //   notice1 = '---영지보스 오늘의 일정---\n';
            //   notice3 = '순서 : '+unit_list[indexnum]+'\n';
            // }else if(subnum == date+1){
            //   notice1 = '---영지보스 내일의 일정---\n';
            //   notice3 = '순서 : '+unit_list[indexnum+1]+'\n';
            // }
            // let notice4 = '시간 : 점심시간, 오후9시 \n';
            // let notice5 = '-----------------------------';
            // let notice_boss = notice1+notice2+notice3+notice4+notice5 ;
            // replier.reply(notice_boss);
            
            while((temp_readline = br.readLine()) !== null){
                let split_temp_readline = temp_readline.split(",");
                let personal_year = split_temp_readline[0];
                let personal_month = split_temp_readline[1];
                let personal_day = split_temp_readline[2];
                let personal_time = split_temp_readline[3];
                let personal_type = split_temp_readline[4];
                let personal_name = split_temp_readline[5];
                if(personal_name=='DEBUG ROOM'){
                  personal_name = '패럴';
                }                
                if(subnum == personal_day){
                    let notice1 = '---'+personal_year+'년 '+personal_month+'월 '+personal_day+'일 일정---\n';
                    let notice2 = '종류 : '+personal_type+'\n';
                    let notice3 = '진행시간 : '+personal_time+'\n';
                    let notice4 = '작성자 : '+personal_name+'\n';
                    let notice5 = '-----------------------------';
                    let notice_alter = notice1+notice2+notice3+notice4+notice5 ;
                    replier.reply(notice_alter);
                }
            }
            fis.close();
            isr.close();
            br.close();
        }catch(error){  }
    }

    if(msg=='파일생성'){
        if(file.exists() == false){
            txtforfile();
            replier.reply("파일을 생성하였습니다.");
        }else{
            replier.reply("파일이 존재합니다.");
        }
    }


    if(msg.startsWith('일정추가')){
        if(file.exists() == false){
            replier.reply("파일이 존재하지 않습니다.");
            replier.reply("강제 파일 생성");   
            txtforfile();
        }
        try{
            var splitStr = msg.split(" "); // msg에서 받아온 TEXT를 띄어쓰기로 분리
            content = splitStr[1]; // "일정추가 month,day,time,type" // name 및 year은 따로 추가시킬예정
            var jfos = new java.io.FileOutputStream(file, true); // append 플래그 지정
            var splitcontent = content.split(",");
            let personal_month = splitcontent[0];
            let personal_day = splitcontent[1];
            let personal_time = splitcontent[2];
            let personal_type = splitcontent[3];
            if(personal_month==null|personal_day==null|personal_time==null|personal_type==null){ throw new Error("일정 추가 형식이 잘못되었습니다."); }
            // json으로 못 읽음 [추후 개선사항]
            // let insert_data = "{ year: "+year+", month: "+personal_month+", day: "+personal_day+", time: "+personal_time+", type: "+personal_type+", name: "+room+",}";
            let insert_data = year+","+content+","+room;
            var contentstring = new java.lang.String(insert_data+"\n"); // "year,month,day,time,type,name"이라는 문자열을 저장
            jfos.write(contentstring.getBytes()); // Byte로 변환
            jfos.close(); // 작업 종료
            replier.reply("일정이 추가되었습니다"); 
        }catch(error){
            replier.reply(error.message);
            replier.reply("[일정추가 월,일,시간,종류] 형태로 다시 작성해주시기 바랍니다.");
        }
    }

    if(msg=='전체일정'){
        if(file.exists() == false){
            replier.reply("파일이 존재하지 않습니다");
        }else{
            read_all();
        }
        
    }

    if(msg=='오늘일정'){
        if(file.exists() == false){
            replier.reply("파일이 존재하지 않습니다");
        }else{
            read_txt(date);
        }
        
    }

    if(msg=='내일일정'){
        if(file.exists() == false){
            replier.reply("파일이 존재하지 않습니다");
        }else{
            read_txt(date+1);
        }
        
    }

    let command_front = "--------------명령어 및 설명--------------\n";
    // let sys_command1 = "영지보스 or 영보결사 : 잡는 순서\n";
    let sys_command1 = "영지보스 or 영보결사 : 01-11부로 규칙으로 변경\n"
    let sys_command2 = "오늘일정 : 오늘의 일정 확인\n";
    let sys_command3 = "내일일정 : 내일의 일정 확인\n";
    let sys_command4 = "전체일정 : 전체 일정 확인\n";
    let sys_command5 = "일정추가 월,일,시간,종류 : 일정 추가\n";
    let sys_command6 = "파일생성 : 기록하는 파일 생성\n";
    let sys_command7 = "";
    let command_back = "--------------------------------------------------\n";
    let command_all = "";
    if(msg=='명령어'){
        command_all = command_front+sys_command1+sys_command2+sys_command3+sys_command4+sys_command5+sys_command6+command_back;
        replier.reply(command_all);
    }

}