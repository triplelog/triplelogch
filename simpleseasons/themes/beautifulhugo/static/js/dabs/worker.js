allconfs = [['America East', 0, 9, 0], ['American Athletic Conference', 9, 21, 0], ['Atlantic 10', 21, 35, 0], ['Atlantic Coast', 35, 50, 0], ['Atlantic Sun', 50, 59, 0], ['Big 12', 59, 69, 0], ['Big East', 69, 79, 0], ['Big Sky', 79, 90, 0], ['Big South', 90, 101, 0], ['Big Ten', 101, 115, 0], ['Big West', 115, 124, 0], ['Colonial Athletic', 124, 134, 0], ['Conference USA', 134, 148, 0], ['Horizon', 148, 158, 0], ['Ivy League', 158, 166, 0], ['Metro Atlantic Athletic', 166, 177, 0], ['Mid-American', 177, 189, 0], ['Mid-Eastern', 189, 201, 0], ['Missouri Valley', 201, 211, 0], ['Mountain West', 211, 222, 0], ['Northeast', 222, 232, 0], ['Ohio Valley', 232, 244, 0], ['Pac-12', 244, 256, 0], ['Patriot League', 256, 266, 0], ['Southern', 266, 276, 0], ['Southeastern', 276, 290, 0], ['Southland', 290, 303, 0], ['Southwestern Athletic', 303, 313, 0], ['Summit League', 313, 322, 0], ['Sun Belt', 322, 334, 0], ['West Coast', 334, 344, 0]];

function genRPIW(wRec,wOpp,wOppOpp,hAdv,allplayed,cteamwp,cteamopp,cteamadjwp){
  teamoppwp=[];teamoppoppwp=[];var teamrpi=[]; var teamwp=[]; var teamopp = []; var teamadjwp = [];
  for (idx=0;idx<allplayed.length;idx++){
          i = allplayed[idx];
          wins = 0;
          games = 0;
          cwins = 0;
          cgames = 0;
          opponents = [];
          adjwins = 0;
          adjgames = 0;
          
          
          for (iidx=1;iidx<i.length/4;iidx++){
                  
                  ii = [i[iidx*4-3],i[iidx*4-2],i[iidx*4-1],i[iidx*4]];

                    games += 1;
                    if (ii[0][1]=='c' && ii[2]>ii[3]){cwins += 1; cgames +=1;}
                    else if (ii[0][1]=='c' && ii[3]>ii[2]){cgames +=1;}
                    if (ii[0][0]=='@'){

                              if (ii[2]>ii[3]){adjwins +=1.0+hAdv; adjgames +=1.0+hAdv; opponents.push([ii[1],0]); wins +=1;}
                              else {adjgames +=1.0-hAdv; opponents.push([ii[1],1]);}
                            
                    }
                    else if (ii[0][0]=='v'){

                              if (ii[2]>ii[3]){adjwins +=1.0; adjgames += 1.0; opponents.push([ii[1],0]); wins +=1;}
                              else {adjgames += 1.0; opponents.push([ii[1],1]);}
                            
                    }
                    else{

                              if (ii[2]>ii[3]){adjwins +=1.0-hAdv; adjgames += 1.0-hAdv; opponents.push([ii[1],0]); wins +=1;}
                              else {adjgames += 1.0+hAdv; opponents.push([ii[1],1]);}
                            
                    }
          }
          teamwp.push([idx,cteamwp[idx][1]+wins,cteamwp[idx][2]+games,cteamwp[idx][3]+cwins,cteamwp[idx][4]+cgames]);
          teamopp.push([idx,cteamopp[idx][1].concat(opponents)]);
          teamadjwp.push([idx,cteamadjwp[idx][1]+adjwins,cteamadjwp[idx][2]+adjgames]);

  }


  for (idx=0;idx<teamopp.length;idx++){
          i = teamopp[idx];
          oppwp = 0.;
          opptot = 0.;
          for (iidx=0;iidx<i[1].length;iidx++){
                  ii = i[1][iidx];
                          iii = teamwp[ii[0]];
                                  if (iii[2]>1){
                                            oppwp += (iii[1]-ii[1])*1./(iii[2]-1.);
                                            opptot += 1.;

                                  }


          }
          if (opptot>0){teamoppwp.push([i[0],oppwp*1./opptot]);}
          else {teamoppwp.push([i[0]]);}
  }

  for (idx=0;idx<teamopp.length;idx++){
          i = teamopp[idx];
          oppwp = 0.;
          opptot = 0.;
          for (iidx=0;iidx<i[1].length;iidx++){
                  ii = i[1][iidx];
                          iii = teamoppwp[ii[0]];
                                if (iii.length>1){
                                  oppwp += iii[1];
                                  opptot += 1.;
                                }

          }
          if (opptot>0){teamoppoppwp.push([i[0],oppwp*1./opptot]);}
          else {teamoppoppwp.push([i[0]]);}
  } 

  for (i=0;i<teamwp.length;i++){
          tname = teamwp[i][0];
          teamopp = -1;
          teamoppopp = -1;

          if (teamoppwp[i].length>1){teamopp=teamoppwp[i][1];}

          if (teamoppoppwp[i].length>1){teamoppopp=teamoppoppwp[i][1];}

          if (teamopp != -1 && teamoppopp != -1){
                  teamrpi.push([tname,(teamadjwp[i][1]/teamadjwp[i][2]*wRec+teamopp*wOpp+teamoppopp*wOppOpp)*(1./(wRec+wOpp+wOppOpp)),(teamopp*wOpp+teamoppopp*wOppOpp)*(1./(wOpp+wOppOpp)),teamadjwp[i][1]/teamadjwp[i][2],teamopp,teamoppopp,teamwp[i][1],teamwp[i][2],teamwp[i][3],teamwp[i][4]])
          }
          else {teamrpi.push([tname,0.0,0.0,0,0,0,0,0,0,0]);}
  }

  return teamrpi;
}
function playgame(ateam,hteam,teamrpi,allplayed,confgame){
          arpi = teamrpi[ateam][1];
          hrpi = teamrpi[hteam][1];
          var winner = 0;
          phwin = (hrpi-hrpi*arpi)/(arpi+hrpi-2*arpi*hrpi);
          if (Math.random()<phwin){
            if (confgame==1){
              allplayed[ateam].push('@c',hteam,3,4);
              allplayed[hteam].push('hc',ateam,4,3);
            }
            else{
              allplayed[ateam].push('@n',hteam,3,4);
              allplayed[hteam].push('hn',ateam,4,3);
            }
            winner = hteam;
          }
          else{
            if (confgame==1){
              allplayed[ateam].push('@c',hteam,4,3);
              allplayed[hteam].push('hc',ateam,3,4);
            }
            else{
              allplayed[ateam].push('@n',hteam,4,3);
              allplayed[hteam].push('hn',ateam,3,4);
            }
            winner = ateam;
          }
  return allplayed,winner;
}
function runThis(teamrpi,alltoplay,teamwp,teamopp,teamadjwp){
  var endrpi;
  var sumrpi = [];
  var confwinsb = [];
  for (i=0;i<teamrpi.length;i++){sumrpi.push([i,0.,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]); confwinsb.push(teamrpi[i][8]);}
  Object.freeze(teamwp); Object.freeze(teamadjwp); Object.freeze(teamopp); Object.freeze(confwinsb);
  for (i=0;i<teamrpi.length;i++){Object.freeze(teamopp[i][1]);Object.freeze(teamwp[i]);Object.freeze(teamadjwp[i]);}

  for (runi=0;runi<500;runi++){
     var allplayed = [];
     var confwins = confwinsb.slice();

    
    for (i=0;i<teamrpi.length;i++){allplayed.push([i]);}

    for (i=0;i<alltoplay.length;i++){
          ateam = alltoplay[i][0]%10000;
          hteam = alltoplay[i][1]%10000;
          cgame = alltoplay[i][2];
          allplayed,winner = playgame(ateam,hteam,teamrpi,allplayed,cgame);
          if (cgame==1){confwins[winner]+=1;}

    }
    
    conf15 = [3];
    for (iii=0;iii<conf15.length;iii++){
      i = conf15[iii];
      var confteams = [];
      for (ii=allconfs[i][1];ii<allconfs[i][2];ii++){
        confteams.push([ii,confwins[ii]]);
      }
      unsorted = true;
      while (unsorted){
              unsorted = false;
              for (ci=0;ci<confteams.length-1;ci++){
                      if (confteams[ci][1]<confteams[ci+1][1]){
                              holdrpi = confteams[ci];
                              confteams[ci]=confteams[ci+1];
                              confteams[ci+1]=holdrpi;
                              unsorted = true;
                      }
              }
      }
      allplayed,winner14 = playgame(confteams[14][0],confteams[9][0],teamrpi,allplayed,0);
      allplayed,winner13 = playgame(confteams[13][0],confteams[10][0],teamrpi,allplayed,0);
      allplayed,winner12 = playgame(confteams[12][0],confteams[11][0],teamrpi,allplayed,0);
      allplayed,winner11 = playgame(winner12,confteams[4][0],teamrpi,allplayed,0);
      allplayed,winner10 = playgame(winner13,confteams[5][0],teamrpi,allplayed,0);
      allplayed,winner9 = playgame(winner14,confteams[6][0],teamrpi,allplayed,0);
      allplayed,winner8 = playgame(confteams[8][0],confteams[7][0],teamrpi,allplayed,0);
      allplayed,winner7 = playgame(winner11,confteams[3][0],teamrpi,allplayed,0);
      allplayed,winner6 = playgame(winner10,confteams[2][0],teamrpi,allplayed,0);
      allplayed,winner5 = playgame(winner9,confteams[1][0],teamrpi,allplayed,0);
      allplayed,winner4 = playgame(winner8,confteams[0][0],teamrpi,allplayed,0);
      allplayed,winner3 = playgame(winner6,winner5,teamrpi,allplayed,0);
      allplayed,winner2 = playgame(winner7,winner4,teamrpi,allplayed,0);
      allplayed,winner1 = playgame(winner3,winner2,teamrpi,allplayed,0);
      allconfs[i][3]=winner1;
    }  
    conf14 = [2,9,12,25];
    for (iii=0;iii<conf14.length;iii++){
      i = conf14[iii];
      var confteams = [];
      for (ii=allconfs[i][1];ii<allconfs[i][2];ii++){
        confteams.push([ii,confwins[ii]]);
      }
      unsorted = true;
      while (unsorted){
              unsorted = false;
              for (ci=0;ci<confteams.length-1;ci++){
                      if (confteams[ci][1]<confteams[ci+1][1]){
                              holdrpi = confteams[ci];
                              confteams[ci]=confteams[ci+1];
                              confteams[ci+1]=holdrpi;
                              unsorted = true;
                      }
              }
      }

      allplayed,winner13 = playgame(confteams[13][0],confteams[10][0],teamrpi,allplayed,0);
      allplayed,winner12 = playgame(confteams[12][0],confteams[11][0],teamrpi,allplayed,0);
      allplayed,winner11 = playgame(winner12,confteams[4][0],teamrpi,allplayed,0);
      allplayed,winner10 = playgame(winner13,confteams[5][0],teamrpi,allplayed,0);
      allplayed,winner9 = playgame(confteams[9][0],confteams[6][0],teamrpi,allplayed,0);
      allplayed,winner8 = playgame(confteams[8][0],confteams[7][0],teamrpi,allplayed,0);
      allplayed,winner7 = playgame(winner11,confteams[3][0],teamrpi,allplayed,0);
      allplayed,winner6 = playgame(winner10,confteams[2][0],teamrpi,allplayed,0);
      allplayed,winner5 = playgame(winner9,confteams[1][0],teamrpi,allplayed,0);
      allplayed,winner4 = playgame(winner8,confteams[0][0],teamrpi,allplayed,0);
      allplayed,winner3 = playgame(winner6,winner5,teamrpi,allplayed,0);
      allplayed,winner2 = playgame(winner7,winner4,teamrpi,allplayed,0);
      allplayed,winner1 = playgame(winner3,winner2,teamrpi,allplayed,0);
      allconfs[i][3]=winner1;
    }
    conf12 = [1,16,17,21,22,29];
    for (iii=0;iii<conf12.length;iii++){
      i = conf12[iii];
      var confteams = [];
      for (ii=allconfs[i][1];ii<allconfs[i][2];ii++){
        confteams.push([ii,confwins[ii]]);
      }
      unsorted = true;
      while (unsorted){
              unsorted = false;
              for (ci=0;ci<confteams.length-1;ci++){
                      if (confteams[ci][1]<confteams[ci+1][1]){
                              holdrpi = confteams[ci];
                              confteams[ci]=confteams[ci+1];
                              confteams[ci+1]=holdrpi;
                              unsorted = true;
                      }
              }
      }

      allplayed,winner11 = playgame(confteams[11][0],confteams[4][0],teamrpi,allplayed,0);
      allplayed,winner10 = playgame(confteams[10][0],confteams[5][0],teamrpi,allplayed,0);
      allplayed,winner9 = playgame(confteams[9][0],confteams[6][0],teamrpi,allplayed,0);
      allplayed,winner8 = playgame(confteams[8][0],confteams[7][0],teamrpi,allplayed,0);
      allplayed,winner7 = playgame(winner11,confteams[3][0],teamrpi,allplayed,0);
      allplayed,winner6 = playgame(winner10,confteams[2][0],teamrpi,allplayed,0);
      allplayed,winner5 = playgame(winner9,confteams[1][0],teamrpi,allplayed,0);
      allplayed,winner4 = playgame(winner8,confteams[0][0],teamrpi,allplayed,0);
      allplayed,winner3 = playgame(winner6,winner5,teamrpi,allplayed,0);
      allplayed,winner2 = playgame(winner7,winner4,teamrpi,allplayed,0);
      allplayed,winner1 = playgame(winner3,winner2,teamrpi,allplayed,0);
      allconfs[i][3]=winner1;
    }
    conf11 = [7,8,15,19];
    for (iii=0;iii<conf11.length;iii++){
      i = conf11[iii];
      var confteams = [];
      for (ii=allconfs[i][1];ii<allconfs[i][2];ii++){
        confteams.push([ii,confwins[ii]]);
      }
      unsorted = true;
      while (unsorted){
              unsorted = false;
              for (ci=0;ci<confteams.length-1;ci++){
                      if (confteams[ci][1]<confteams[ci+1][1]){
                              holdrpi = confteams[ci];
                              confteams[ci]=confteams[ci+1];
                              confteams[ci+1]=holdrpi;
                              unsorted = true;
                      }
              }
      }
      allplayed,winner10 = playgame(confteams[10][0],confteams[5][0],teamrpi,allplayed,0);
      allplayed,winner9 = playgame(confteams[9][0],confteams[6][0],teamrpi,allplayed,0);
      allplayed,winner8 = playgame(confteams[8][0],confteams[7][0],teamrpi,allplayed,0);
      allplayed,winner7 = playgame(winner11,confteams[3][0],teamrpi,allplayed,0);
      allplayed,winner6 = playgame(winner10,confteams[2][0],teamrpi,allplayed,0);
      allplayed,winner5 = playgame(winner9,confteams[1][0],teamrpi,allplayed,0);
      allplayed,winner4 = playgame(winner8,confteams[0][0],teamrpi,allplayed,0);
      allplayed,winner3 = playgame(winner6,winner5,teamrpi,allplayed,0);
      allplayed,winner2 = playgame(winner7,winner4,teamrpi,allplayed,0);
      allplayed,winner1 = playgame(winner3,winner2,teamrpi,allplayed,0);
      allconfs[i][3]=winner1;
    }
    conf10 = [5,6,11,13,18,20,23,24,27,30];
    for (iii=0;iii<conf10.length;iii++){
      i = conf10[iii];
      var confteams = [];
      for (ii=allconfs[i][1];ii<allconfs[i][2];ii++){
        confteams.push([ii,confwins[ii]]);
      }
      unsorted = true;
      while (unsorted){
              unsorted = false;
              for (ci=0;ci<confteams.length-1;ci++){
                      if (confteams[ci][1]<confteams[ci+1][1]){
                              holdrpi = confteams[ci];
                              confteams[ci]=confteams[ci+1];
                              confteams[ci+1]=holdrpi;
                              unsorted = true;
                      }
              }
      }


      allplayed,winner9 = playgame(confteams[9][0],confteams[6][0],teamrpi,allplayed,0);
      allplayed,winner8 = playgame(confteams[8][0],confteams[7][0],teamrpi,allplayed,0);
      allplayed,winner7 = playgame(confteams[4][0],confteams[3][0],teamrpi,allplayed,0);
      allplayed,winner6 = playgame(confteams[5][0],confteams[2][0],teamrpi,allplayed,0);
      allplayed,winner5 = playgame(winner9,confteams[1][0],teamrpi,allplayed,0);
      allplayed,winner4 = playgame(winner8,confteams[0][0],teamrpi,allplayed,0);
      allplayed,winner3 = playgame(winner6,winner5,teamrpi,allplayed,0);
      allplayed,winner2 = playgame(winner7,winner4,teamrpi,allplayed,0);
      allplayed,winner1 = playgame(winner3,winner2,teamrpi,allplayed,0);
      allconfs[i][3]=winner1;
    }
    conf8 = [14,0,4,10,28,26];
    for (iii=0;iii<conf8.length;iii++){
      i = conf8[iii];
      var confteams = [];
      for (ii=allconfs[i][1];ii<allconfs[i][2];ii++){
        confteams.push([ii,confwins[ii]]);
      }
      unsorted = true;
      while (unsorted){
              unsorted = false;
              for (ci=0;ci<confteams.length-1;ci++){
                      if (confteams[ci][1]<confteams[ci+1][1]){
                              holdrpi = confteams[ci];
                              confteams[ci]=confteams[ci+1];
                              confteams[ci+1]=holdrpi;
                              unsorted = true;
                      }
              }
      }

      allplayed,winner7 = playgame(confteams[4][0],confteams[3][0],teamrpi,allplayed,0);
      allplayed,winner6 = playgame(confteams[5][0],confteams[2][0],teamrpi,allplayed,0);
      allplayed,winner5 = playgame(confteams[6][0],confteams[1][0],teamrpi,allplayed,0);
      allplayed,winner4 = playgame(confteams[7][0],confteams[0][0],teamrpi,allplayed,0);
      allplayed,winner3 = playgame(winner6,winner5,teamrpi,allplayed,0);
      allplayed,winner2 = playgame(winner7,winner4,teamrpi,allplayed,0);
      allplayed,winner1 = playgame(winner3,winner2,teamrpi,allplayed,0);
      allconfs[i][3]=winner1;
    }
    conf8special = [];
    for (iii=0;iii<conf8special.length;iii++){
      i = conf8special[iii];
      var confteams = [];
      for (ii=allconfs[i][1];ii<allconfs[i][2];ii++){
        confteams.push([ii,confwins[ii]]);
      }
      unsorted = true;
      while (unsorted){
              unsorted = false;
              for (ci=0;ci<confteams.length-1;ci++){
                      if (confteams[ci][1]<confteams[ci+1][1]){
                              holdrpi = confteams[ci];
                              confteams[ci]=confteams[ci+1];
                              confteams[ci+1]=holdrpi;
                              unsorted = true;
                      }
              }
      }

      allplayed,winner7 = playgame(confteams[6][0],confteams[5][0],teamrpi,allplayed,0);
      allplayed,winner6 = playgame(confteams[7][0],confteams[4][0],teamrpi,allplayed,0);

      allplayed,winner5 = playgame(winner6,confteams[3][0],teamrpi,allplayed,0);
      allplayed,winner4 = playgame(winner7,confteams[2][0],teamrpi,allplayed,0);

      allplayed,winner3 = playgame(winner5,confteams[0][0],teamrpi,allplayed,0);
      allplayed,winner2 = playgame(winner4,confteams[1][0],teamrpi,allplayed,0);

      allplayed,winner1 = playgame(winner3,winner2,teamrpi,allplayed,0);
      allconfs[i][3]=winner1;
    }
    conf7 = [];
    for (iii=0;iii<conf7.length;iii++){
      i = conf7[iii];
      var confteams = [];
      for (ii=allconfs[i][1];ii<allconfs[i][2];ii++){
        confteams.push([ii,confwins[ii]]);
      }
      unsorted = true;
      while (unsorted){
              unsorted = false;
              for (ci=0;ci<confteams.length-1;ci++){
                      if (confteams[ci][1]<confteams[ci+1][1]){
                              holdrpi = confteams[ci];
                              confteams[ci]=confteams[ci+1];
                              confteams[ci+1]=holdrpi;
                              unsorted = true;
                      }
              }
      }

      allplayed,winner6 = playgame(confteams[4][0],confteams[3][0],teamrpi,allplayed,0);
      allplayed,winner5 = playgame(confteams[5][0],confteams[2][0],teamrpi,allplayed,0);
      allplayed,winner4 = playgame(confteams[6][0],confteams[1][0],teamrpi,allplayed,0);
      allplayed,winner3 = playgame(winner6,confteams[0][0],teamrpi,allplayed,0);
      allplayed,winner2 = playgame(winner5,winner4,teamrpi,allplayed,0);
      allplayed,winner1 = playgame(winner3,winner2,teamrpi,allplayed,0);
      allconfs[i][3]=winner1;
    }
    conf4 = [];
    for (iii=0;iii<conf4.length;iii++){
      i = conf4[iii];
      var confteams = [];
      for (ii=allconfs[i][1];ii<allconfs[i][2];ii++){
        confteams.push([ii,confwins[ii]]);
      }
      unsorted = true;
      while (unsorted){
              unsorted = false;
              for (ci=0;ci<confteams.length-1;ci++){
                      if (confteams[ci][1]<confteams[ci+1][1]){
                              holdrpi = confteams[ci];
                              confteams[ci]=confteams[ci+1];
                              confteams[ci+1]=holdrpi;
                              unsorted = true;
                      }
              }
      }


      allplayed,winner3 = playgame(confteams[2][0],confteams[1][0],teamrpi,allplayed,0);
      allplayed,winner2 = playgame(confteams[3][0],confteams[0][0],teamrpi,allplayed,0);
      allplayed,winner1 = playgame(winner3,winner2,teamrpi,allplayed,0);
      allconfs[i][3]=winner1;
    }

    allchamps = [];
    for (i=0;i<allconfs.length;i++){sumrpi[allconfs[i][3]][6]+=1; allchamps.push(allconfs[i][3]);}

    endrpi = genRPIW(.25,.5,.25,.4, allplayed, teamwp, teamopp, teamadjwp);
    for (i=0;i<endrpi.length;i++){sumrpi[i][1]+=endrpi[i][1];sumrpi[i][2]+=endrpi[i][6];sumrpi[i][3]+=endrpi[i][7]-endrpi[i][6];sumrpi[i][4]+=endrpi[i][8];sumrpi[i][5]+=endrpi[i][9]-endrpi[i][8];}
    

    natlarge = 68+4-allchamps.length;
    topbubblerpi = [];
    for (i=0;i<natlarge;i++){topbubblerpi.push([-1,0]);}
    for (i=0;i<endrpi.length;i++){
      if (allchamps.indexOf(i)==-1){
        for (ii=0;ii<natlarge;ii++){
          if (endrpi[i][1]>topbubblerpi[ii][1] || topbubblerpi[ii][0]==-1){
            for (iii=natlarge-1;iii>ii;iii--){topbubblerpi[iii]=topbubblerpi[iii-1];}
            topbubblerpi[ii]=[endrpi[i][0],endrpi[i][1]];
            break;
          }

        }
      }
    }
    first4out = topbubblerpi.slice(natlarge-4,natlarge);
    last4in = topbubblerpi.slice(natlarge-8,natlarge-4);
    topbubblerpi = topbubblerpi.slice(0,natlarge-8);

    for (i=0;i<allchamps.length;i++){
      addteam = true;
      for (ii=0;ii<topbubblerpi.length;ii++){
        if (endrpi[allchamps[i]][1]>topbubblerpi[ii][1]){
          topbubblerpi.splice(ii,0,[allchamps[i],endrpi[allchamps[i]][1]]); addteam = false; break;
        }
      }
      if (addteam){topbubblerpi.push([allchamps[i],endrpi[allchamps[i]][1]]);}
    }
    for (i=0;i<11;i++){
      for (ii=0;ii<4;ii++){
        sumrpi[topbubblerpi[i*4+ii][0]][7+i]+=1;
      }
    }
    for (i=11;i<12;i++){
      for (ii=0;ii<2;ii++){
        sumrpi[topbubblerpi[i*4+ii][0]][7+i]+=1;
      }
    }
    for (i=12;i<15;i++){
      for (ii=0;ii<4;ii++){
        sumrpi[topbubblerpi[i*4+ii-2][0]][7+i]+=1;
      }
    }
    for (i=15;i<16;i++){
      for (ii=0;ii<2;ii++){
        sumrpi[topbubblerpi[i*4+ii-2][0]][7+i]+=1;
      }
    }
    for (i=15;i<16;i++){
      for (ii=0;ii<4;ii++){
        sumrpi[topbubblerpi[i*4+ii][0]][8+i]+=1;
      }
    }
    for (i=0;i<4;i++){sumrpi[last4in[i][0]][24]+=1;}
    for (i=0;i<4;i++){sumrpi[first4out[i][0]][25]+=1;}

    winners = [];
    for (i=0;i<68;i++){winners.push(0);}
    allplayed,winners[67] = playgame(last4in[2][0],last4in[1][0],teamrpi,allplayed,0);
    allplayed,winners[66] = playgame(last4in[3][0],last4in[0][0],teamrpi,allplayed,0);
    allplayed,winners[65] = playgame(topbubblerpi[62][0],topbubblerpi[61][0],teamrpi,allplayed,0);
    allplayed,winners[64] = playgame(topbubblerpi[63][0],topbubblerpi[60][0],teamrpi,allplayed,0);

    allplayed,winners[49] = playgame(winners[67],topbubblerpi[17][0],teamrpi,allplayed,0);
    allplayed,winners[48] = playgame(winners[66],topbubblerpi[16][0],teamrpi,allplayed,0);
    allplayed,winners[33] = playgame(winners[65],topbubblerpi[1][0],teamrpi,allplayed,0);
    allplayed,winners[32] = playgame(winners[64],topbubblerpi[0][0],teamrpi,allplayed,0);



    for (i=0;i<32;i++){
      if (i!=0 && i!=1 && i!=16 &&i!=17){
        if (i<16){
          allplayed,winners[32+i] = playgame(topbubblerpi[61-i][0],topbubblerpi[i][0],teamrpi,allplayed,0);
        }
        else{
          allplayed,winners[32+i] = playgame(topbubblerpi[63-i][0],topbubblerpi[i][0],teamrpi,allplayed,0);
        }
      }
      sumrpi[winners[32+i]][26]+=1;
    }

    for (i=0;i<16;i++){      allplayed,winners[16+i] = playgame(winners[63-i],winners[32+i],teamrpi,allplayed,0); sumrpi[winners[16+i]][27]+=1;   }
    for (i=0;i<8;i++){      allplayed,winners[8+i] = playgame(winners[31-i],winners[16+i],teamrpi,allplayed,0); sumrpi[winners[8+i]][28]+=1;   }
    for (i=0;i<4;i++){      allplayed,winners[4+i] = playgame(winners[15-i],winners[8+i],teamrpi,allplayed,0);  sumrpi[winners[4+i]][29]+=1;  }
    for (i=0;i<2;i++){      allplayed,winners[2+i] = playgame(winners[7-i],winners[4+i],teamrpi,allplayed,0);  sumrpi[winners[2+i]][30]+=1;  }
    allplayed,winners[1] = playgame(winners[3],winners[2],teamrpi,allplayed,0);sumrpi[winners[1]][31]+=1;
    for (i=1;i<68;i++){sumrpi[winners[i]][2]+=1;}
    for (i=0;i<64;i++){sumrpi[topbubblerpi[i][0]][3]+=1;}
    for (i=0;i<4;i++){sumrpi[last4in[i][0]][3]+=1;}
    sumrpi[winners[1]][2]-=1;



  }
  return sumrpi;
}

onmessage = function(e) {console.log(Date.now()); var sumrpi = runThis(e.data[0],e.data[1],e.data[2],e.data[3],e.data[4]); console.log(Date.now()); 
    postMessage(sumrpi); 
};
        