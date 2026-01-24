public class GroupCasesByOrigin {
    public static void groupCases(){
        Map<String,List<Case>> caseOriginMap = new Map<String,List<Case>>();
        List<String> origin = new List<String>();
        
        Schema.DescribeFieldResult F = Case.Origin.getDescribe();
		List<Schema.PicklistEntry> Picklist = F.getPicklistValues();
        for(Schema.PicklistEntry P : Picklist){
            origin.add(P.getValue());
        }
        List<Case> caseList = [select id,origin from case];
        for(String caseOrigin : origin){
            for(case cs : caseList){
                if(caseOriginMap.containsKey(caseOrigin)){
                    if(cs.Origin == caseOrigin){
                         caseOriginMap.get(caseOrigin).add(cs);
                    }                   
                }
                else{
                    if(cs.Origin == caseOrigin){
                         caseOriginMap.put(caseOrigin,new List<Case>{cs});
                    }                     
                }
            }
        }
        
        for(String org : caseOriginMap.Keyset()){
            system.debug('The Case Origin : '+ org);
            for(case c : caseOriginMap.get(org)){
                system.debug('The case : '+ c);
            }
        }
    }
}