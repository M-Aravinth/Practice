/**
 * @description: This class is used to fetch the last five tasks
 */
public with sharing class LastFiveTask {
    /**
     * @description This method retrieves the last five tasks and logs them.
     */
    public static void getTask() {
        List<Task> tasks = [Select id from Task with User_Mode order by Createddate desc Limit 5];
        if(tasks.size()>0){
            for(Task t :tasks){
                System.debug(t); // NOPMD
            }
        }
    }
}