export interface Response {
  media_id: number
  media_id_string: string
  media_key: string
  size: number
  expires_after_secs: number
  processing_info: { state: string; check_after_secs: number }
}
