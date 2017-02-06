import request from '../utils/request';
import { httpUrl } from '../tests/testHttpUrl';

var URL = httpUrl();

export function fetchCreatTheatreGrounp(params) {
  return request(`${URL}/user/director/save_group.do`,{
    method: 'post',
    credentials:'include',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`title=${params.title}
    	  &cover=${params.cover}
    	  &name=${params.name}
    	  &theme=${JSON.stringify(params.theme)}
    	  &type=${JSON.stringify(params.type)}
    	  &broadcastPlatform=${JSON.stringify(params.broadcastPlatform)}
    	  &startTime=${params.startTime}
    	  &stopTime=${params.stopTime}
    	  &bootTime=${params.bootTime}
    	  &shootLocations=${params.shootLocations}
    	  &shootPeriod=${params.shootPeriod}
    	  &productCompany=${params.productCompany}
    	  &productPersion=${params.productPersion}
    	  &makingPersion=${params.makingPersion}
    	  &performPersion=${params.performPersion}
    	  &originalWork=${params.originalWork}
    	  &scriptwriterName=${params.scriptwriterName}
    	  &directorName=${params.directorName}
    	  &counselorName=${params.counselorName}
    	  &comprehensiveName=${params.comprehensiveName}
    	  &comprehensiveMobile=${params.comprehensiveMobile}
    	  &comprehensiveEmail=${params.comprehensiveEmail}
    	  &comprehensiveAssistantName=${params.comprehensiveAssistantName}
    	  &comprehensiveAssistantMobile=${params.comprehensiveAssistantMobile}
    	  &schemeName=${params.schemeName}
    	  &producerName=${params.producerName}
    	  &reservePerformerNames=${params.reservePerformerNames}
    	  &directorMobile=${params.directorMobile}
    	  &assistantDirectorEmail=${params.assistantDirectorEmail}
    	  &makeAddress=${params.makeAddress}
    	  &synopsis=${params.synopsis}
    	  &otherConfigJson=${JSON.stringify(params.otherConfigJson)}
    	  &roleJson=${JSON.stringify(params.roleJson)}
    	`,
    mode:"cors",
  });
}