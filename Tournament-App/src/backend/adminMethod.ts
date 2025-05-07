
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gnizexyukhsxshxtqvof.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduaXpleHl1a2hzeHNoeHRxdm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MTIzMTYsImV4cCI6MjA2MTE4ODMxNn0.jWY9R2-qPK6ZytOs81Q2eFLt0XZ_b7APo4Jm7LH1wKc';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



export async function addTournament(
  trName: string,
  startDate: string,
  endDate: string
): Promise<any> {
  const { data, error } = await supabase.rpc('add_tournament', {
    _tr_name: trName,
    _start_date: startDate,
    _end_date: endDate
  });
  if (error) throw error;
  return data;
}

export async function addTeamToTournament(
  trId: number | string,
  teamId: number | string,
  teamGroup: string
): Promise<void> {
  const { error } = await supabase.rpc('add_team_to_tournament', {
    _tr_id: parseInt(trId.toString()),
    _team_id: parseInt(teamId.toString()),
    _team_group: teamGroup
  });
  if (error) throw error;
}

export async function selectCaptainForTeam(
  matchNo: number,
  teamId: number,
  playerCaptain: number
): Promise<void> {
  const { error } = await supabase.rpc('select_captain_for_team', {
    _match_no: matchNo,
    _team_id: teamId,
    _player_captain: playerCaptain
  });
  if (error) throw error;
}

export async function approvePlayerForTeam(
  playerId: number,
  teamId: number,
  trId: number
): Promise<void> {
  const { error } = await supabase.rpc('approve_player_for_team', {
    _player_id: playerId,
    _team_id: teamId,
    _tr_id: trId
  });
  if (error) throw error;
}

export async function deleteTournament(trId: number): Promise<void> {
  const { error } = await supabase.rpc('delete_tournament', {
    _tr_id: trId
  });
  if (error) throw error;
}
export async function getAllRequests(): Promise<any> {
  const { data, error } = await supabase.rpc('get_all_requests');
  if (error) throw error;
  return data;
}
export async function addPlayerToTeam(playerId: number, teamId: number, trId: number): Promise<void> {
  const { error } = await supabase.rpc('add_player_to_team', {
    _player_id: playerId,
    _team_id: teamId,
    _tr_id: trId
  });
  if (error) throw error;
}
export async function removeRequest(playerId: number, trId: number): Promise<void> {
  const { error } = await supabase.rpc('remove_request', {
    _player_id: playerId,
    _tr_id: trId
  });
  if (error) throw error;
}
